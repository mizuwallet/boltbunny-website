import { ACCESS_TOKEN_LS, AptosClient } from '@/config';
import { RULE_STATUS } from '@/config/Enum';
import useAppStore from '@/store/AppStore';
import { MoveFunctionId } from '@aptos-labs/ts-sdk';
import { GraphQLClient, gql } from 'graphql-request';

interface LoginParams {
  address: string;
  publicKey: string;
  signMessage: string;
  signature: string;
}

interface CreateAppParams {
  name: string;
  secret: string;
  userId: string;
  network: string;
}

const GQL_Client = new GraphQLClient(import.meta.env.VITE_APP_GRAPHQL_URL, {
  headers: () => ({
    authorization: `Bearer ${window.localStorage.getItem(ACCESS_TOKEN_LS) || ''}`,
  }),
});

const GQL_Client_Login = new GraphQLClient(import.meta.env.VITE_APP_GRAPHQL_URL);

const useGraphql = () => {
  const appStore = useAppStore();

  const login = async (params: LoginParams) => {
    const result: any = await GQL_Client_Login.request(
      gql`
        mutation login(
          $address: String!
          $publicKey: String!
          $signMessage: String!
          $signature: String!
        ) {
          login(
            loginParams: {
              address: $address
              publicKey: $publicKey
              signMessage: $signMessage
              signature: $signature
            }
          ) {
            accessToken
          }
        }
      `,
      {
        ...params,
      },
    );

    const token = result?.login?.accessToken;
    if (token) {
      localStorage.setItem(ACCESS_TOKEN_LS, token);
      appStore.loadJwtToken();
    }
  };

  const createApp = async (params: CreateAppParams) => {
    await GQL_Client.request(
      gql`
        mutation MyMutation(
          $name: String!
          $secret: String!
          $userId: bigint!
          $network: network_enum!
        ) {
          insert_application_one(
            object: { name: $name, secret: $secret, user_id: $userId, network: $network }
          ) {
            name
          }
        }
      `,
      {
        ...params,
      },
    );
  };

  const getAppListByUserId = async () => {
    return await GQL_Client.request(
      gql`
        query getAppList($userId: bigint!) {
          login_user_by_pk(id: $userId) {
            applications(order_by: { created_at: desc }) {
              id
              name
              created_at
              status
            }
            applications_aggregate {
              aggregate {
                count
              }
            }
          }
        }
      `,
      {
        userId: appStore.userId,
      },
    );
  };

  const getAppByAppName = async (name: string | number) => {
    return await GQL_Client.request(
      gql`
        query getAppInfo($name: String!) {
          application(where: { name: { _eq: $name } }) {
            created_at
            id
            name
            secret
            status
            updated_at
            user_id
            type
            allowed_origins
            rule {
              created_at
              entry_function_str
              id
              name
              status
            }
          }
        }
      `,
      {
        name,
      },
    );
  };

  /**
   * Request deposit address by user id
   * A user has one deposit address
   *
   *
   * @returns wallets
   */
  const getDepositAddressByUserId = async () => {
    return await GQL_Client.request(
      gql`
        query getAppList($userId: bigint!) {
          login_user_by_pk(id: $userId) {
            wallets {
              address
            }
          }
        }
      `,
      {
        userId: appStore.userId,
      },
    );
  };

  const functionIdExist = async (entry_function_str: MoveFunctionId) => {
    const [contract, module, functionId] = entry_function_str.split('::');
    const result: any = await AptosClient.getAccountModule({
      accountAddress: contract,
      moduleName: module,
    });

    const targetFunction = result.abi.exposed_functions.filter((f: any) => f.name === functionId);

    if (!targetFunction) {
      throw new Error("The function doesn't exist.");
    }

    if (!targetFunction.is_entry) {
      throw new Error('The function should be the entry function.');
    }
  };

  const createRule = async (
    entry_function_str: MoveFunctionId,
    application_id: number | string,
  ) => {
    // check function exist
    await functionIdExist(entry_function_str);

    return await GQL_Client.request(
      gql`
        mutation CreateRule(
          $application_id: bigint!
          $entry_function_str: String!
          $name: String!
        ) {
          insert_rule_one(
            object: {
              application_id: $application_id
              entry_function_str: $entry_function_str
              name: $name
            }
          ) {
            application_id
          }
        }
      `,
      {
        application_id,
        entry_function_str,
        name: entry_function_str,
      },
    );
  };

  const getRulesListByAppId = async (appId: number | string) => {
    return await GQL_Client.request(
      gql`
        query MyQuery($appId: bigint = "") {
          rule(where: { application_id: { _eq: $appId } }, order_by: { status: asc }) {
            created_at
            entry_function_str
            id
            name
            status
            updated_at
          }
        }
      `,
      {
        appId,
      },
    );
  };

  const pauseRule = async (ruleId: number | string, status: RULE_STATUS) => {
    return await GQL_Client.request(
      gql`
        mutation pauseRule($ruleId: bigint!, $status: Int!) {
          update_rule_by_pk(pk_columns: { id: $ruleId }, _set: { status: $status }) {
            id
          }
        }
      `,
      {
        ruleId,
        status,
      },
    );
  };

  const updateOriginByAppId = async (appId: number | string, origins: string[]) => {
    return await GQL_Client.request(
      gql`
        mutation MyMutation($appId: bigint!, $allowed_origins: jsonb!) {
          update_application_by_pk(
            pk_columns: { id: $appId }
            _set: { allowed_origins: $allowed_origins }
          ) {
            id
          }
        }
      `,
      {
        appId,
        allowed_origins: origins,
      },
    );
  };

  const getTransactionHistory = async () => {};

  return {
    login,

    createApp,
    getAppListByUserId,
    getAppByAppName,
    getDepositAddressByUserId,

    pauseRule,
    createRule,
    getRulesListByAppId,
    updateOriginByAppId,

    getTransactionHistory,
  };
};

export default useGraphql;

