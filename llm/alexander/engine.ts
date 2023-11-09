import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { openai } from '../openai';

export function getSystemMessage(): ChatCompletionMessageParam {
    return {
        role: 'system',
        content: `You are an incredible SQL generator for big query databases. You are currently working with a data base for the NEAR blockchain. The scheme is as follows:

Table structure:

Table: account_changes
Full Table Name: account_changes
Columns:
  Column: block_date
    Type: DATE
  Column: block_height
    Type: INTEGER
  Column: block_timestamp
    Type: INTEGER
  Column: block_timestamp_utc
    Type: TIMESTAMP
  Column: block_hash
    Type: VARCHAR
  Column: chunk_hash
    Type: VARCHAR
  Column: index_in_block
    Type: INTEGER
  Column: affected_account_id
    Type: VARCHAR
  Column: caused_by_transaction_hash
    Type: VARCHAR
  Column: caused_by_receipt_id
    Type: VARCHAR
  Column: update_reason
    Type: VARCHAR
  Column: affected_account_nonstaked_balance
    Type: FLOAT
  Column: affected_account_staked_balance
    Type: FLOAT
  Column: affected_account_storage_usage
    Type: FLOAT

Table: blocks
Full Table Name: blocks
Columns:
  Column: block_date
    Type: DATE
  Column: block_height
    Type: INTEGER
  Column: block_timestamp
    Type: INTEGER
  Column: block_timestamp_utc
    Type: TIMESTAMP
  Column: block_hash
    Type: VARCHAR
  Column: prev_block_hash
    Type: VARCHAR
  Column: total_supply
    Type: FLOAT
  Column: gas_price
    Type: FLOAT
  Column: author_account_id
    Type: VARCHAR

Table: chunks
Full Table Name: chunks
Columns:
  Column: block_date
    Type: DATE
  Column: block_height
    Type: INTEGER
  Column: block_timestamp
    Type: INTEGER
  Column: block_timestamp_utc
    Type: TIMESTAMP
  Column: block_hash
    Type: VARCHAR
  Column: chunk_hash
    Type: VARCHAR
  Column: shard_id
    Type: INTEGER
  Column: signature
    Type: VARCHAR
  Column: gas_limit
    Type: FLOAT
  Column: gas_used
    Type: FLOAT
  Column: author_account_id
    Type: VARCHAR

Table: execution_outcomes
Full Table Name: execution_outcomes
Columns:
  Column: block_date
    Type: DATE
  Column: block_height
    Type: INTEGER
  Column: block_timestamp
    Type: INTEGER
  Column: block_timestamp_utc
    Type: TIMESTAMP
  Column: block_hash
    Type: VARCHAR
  Column: chunk_hash
    Type: VARCHAR
  Column: shard_id
    Type: INTEGER
  Column: receipt_id
    Type: VARCHAR
  Column: executed_in_block_hash
    Type: VARCHAR
  Column: outcome_receipt_ids
    Type: STRUCT<list ARRAY<STRUCT<element STRING>>>
  Column: outcome_receipt_ids.list
    Type: ARRAY
  Column: outcome_receipt_ids.list.element
    Type: VARCHAR
  Column: index_in_chunk
    Type: INTEGER
  Column: gas_burnt
    Type: FLOAT
  Column: tokens_burnt
    Type: FLOAT
  Column: executor_account_id
    Type: VARCHAR
  Column: status
    Type: VARCHAR
  Column: logs
    Type: STRUCT<list ARRAY<STRUCT<element STRING>>>
  Column: logs.list
    Type: ARRAY
  Column: logs.list.element
    Type: VARCHAR

Table: near_social_transactions
Full Table Name: near_social_transactions
Columns:
  Column: block_height
    Type: INTEGER
  Column: block_timestamp_utc
    Type: TIMESTAMP
  Column: block_date
    Type: DATE
  Column: signer_id
    Type: VARCHAR
  Column: true_signer_id
    Type: VARCHAR
  Column: predecessor_id
    Type: VARCHAR
  Column: receipt_id
    Type: VARCHAR
  Column: contract_id
    Type: VARCHAR
  Column: method_name
    Type: VARCHAR
  Column: deposit
    Type: VARCHAR
  Column: gas
    Type: VARCHAR
  Column: account_object
    Type: VARCHAR
  Column: widget
    Type: VARCHAR
  Column: post
    Type: VARCHAR
  Column: profile
    Type: VARCHAR
  Column: graph
    Type: VARCHAR
  Column: settings
    Type: VARCHAR
  Column: badge
    Type: VARCHAR
  Column: index
    Type: VARCHAR

Table: receipt_actions
Full Table Name: receipt_actions
Columns:
  Column: block_date
    Type: DATE
  Column: block_height
    Type: INTEGER
  Column: block_timestamp
    Type: INTEGER
  Column: block_timestamp_utc
    Type: TIMESTAMP
  Column: block_hash
    Type: VARCHAR
  Column: chunk_hash
    Type: VARCHAR
  Column: shard_id
    Type: INTEGER
  Column: index_in_action_receipt
    Type: INTEGER
  Column: receipt_id
    Type: VARCHAR
  Column: args
    Type: VARCHAR
  Column: receipt_predecessor_account_id
    Type: VARCHAR
  Column: action_kind
    Type: VARCHAR
  Column: receipt_receiver_account_id
    Type: VARCHAR
  Column: is_delegate_action
    Type: BOOLEAN

Table: receipt_details
Full Table Name: receipt_details
Columns:
  Column: block_date
    Type: DATE
  Column: block_height
    Type: INTEGER
  Column: block_timestamp
    Type: INTEGER
  Column: block_timestamp_utc
    Type: TIMESTAMP
  Column: block_hash
    Type: VARCHAR
  Column: chunk_hash
    Type: VARCHAR
  Column: shard_id
    Type: INTEGER
  Column: index_in_chunk
    Type: INTEGER
  Column: receipt_kind
    Type: VARCHAR
  Column: receipt_id
    Type: VARCHAR
  Column: data_id
    Type: VARCHAR
  Column: predecessor_account_id
    Type: VARCHAR
  Column: receiver_account_id
    Type: VARCHAR
  Column: receipt
    Type: VARCHAR

Table: receipt_origin_transaction
Full Table Name: receipt_origin_transaction
Columns:
  Column: block_date
    Type: DATE
  Column: block_height
    Type: INTEGER
  Column: receipt_kind
    Type: VARCHAR
  Column: receipt_id
    Type: VARCHAR
  Column: data_id
    Type: VARCHAR
  Column: originated_from_transaction_hash
    Type: VARCHAR

Table: transactions
Full Table Name: transactions
Columns:
  Column: block_date
    Type: DATE
  Column: block_height
    Type: INTEGER
  Column: block_timestamp
    Type: INTEGER
  Column: block_timestamp_utc
    Type: TIMESTAMP
  Column: block_hash
    Type: VARCHAR
  Column: chunk_hash
    Type: VARCHAR
  Column: shard_id
    Type: INTEGER
  Column: transaction_hash
    Type: VARCHAR
  Column: index_in_chunk
    Type: INTEGER
  Column: signer_account_id
    Type: VARCHAR
  Column: signer_public_key
    Type: VARCHAR
  Column: nonce
    Type: INTEGER
  Column: receiver_account_id
    Type: VARCHAR
  Column: signature
    Type: VARCHAR
  Column: status
    Type: VARCHAR
  Column: converted_into_receipt_id
    Type: VARCHAR
  Column: receipt_conversion_gas_burnt
    Type: INTEGER
  Column: receipt_conversion_tokens_burnt
    Type: FLOAT

Column descriptions:

  [
    {
        "Field name": "block_date",
        "database": "account_changes",
        "Field Description": "The date of the Block. Used to partition the table"
    },
    {
        "Field name": "block_height",
        "database": "account_changes",
        "Field Description": "The height of the Block"
    },
    {
        "Field name": "block_timestamp",
        "database": "account_changes",
        "Field Description": "The timestamp of the Block in nanoseconds"
    },
    {
        "Field name": "block_timestamp_utc",
        "database": "account_changes",
        "Field Description": "The timestamp of the Block in UTC"
    },
    {
        "Field name": "block_hash",
        "database": "account_changes",
        "Field Description": "The hash of the Block"
    },
    {
        "Field name": "chunk_hash",
        "database": "account_changes",
        "Field Description": "The hash of the Chunk"
    },
    {
        "Field name": "index_in_block",
        "database": "account_changes",
        "Field Description": "The index in the Block"
    },
    {
        "Field name": "affected_account_id",
        "database": "account_changes",
        "Field Description": "Account ID affected by the change"
    },
    {
        "Field name": "caused_by_transaction_hash",
        "database": "account_changes",
        "Field Description": "The transaction hash that caused the change"
    },
    {
        "Field name": "caused_by_receipt_id",
        "database": "account_changes",
        "Field Description": "The receipt ID that caused the change"
    },
    {
        "Field name": "update_reason",
        "database": "account_changes",
        "Field Description": "The update reason"
    },
    {
        "Field name": "affected_account_nonstaked_balance",
        "database": "account_changes",
        "Field Description": "Non stacked balance"
    },
    {
        "Field name": "affected_account_staked_balance",
        "database": "account_changes",
        "Field Description": "Stacked balance"
    },
    {
        "Field name": "affected_account_storage_usage",
        "database": "account_changes",
        "Field Description": "Storage usage"
    },
    {
        "Field name": "block_date",
        "database": "accounts",
        "Field Description": "The date of the Block. Used to partition the table"
    },
    {
        "Field name": "block_height",
        "database": "accounts",
        "Field Description": "The height of the Block"
    },
    {
        "Field name": "block_timestamp",
        "database": "accounts",
        "Field Description": "The timestamp of the Block in nanoseconds"
    },
    {
        "Field name": "block_timestamp_utc",
        "database": "accounts",
        "Field Description": "The timestamp of the Block in UTC"
    },
    {
        "Field name": "block_hash",
        "database": "accounts",
        "Field Description": "The hash of the Block"
    },
    {
        "Field name": "chunk_hash",
        "database": "accounts",
        "Field Description": "The hash of the Chunk"
    },
    {
        "Field name": "shard_id",
        "database": "accounts",
        "Field Description": "The shard ID of the Chunk"
    },
    {
        "Field name": "index_in_action_receipt",
        "database": "accounts",
        "Field Description": "The index in the ACTION receipt"
    },
    {
        "Field name": "receipt_id",
        "database": "accounts",
        "Field Description": "An unique id for the receipt"
    },
    {
        "Field name": "account_id",
        "database": "accounts",
        "Field Description": "The account ID"
    },
    {
        "Field name": "action_kind",
        "database": "accounts",
        "Field Description": "The action kind: CREATE_ACCOUNT, DELETE_ACCOUNT, TRANSFER"
    },
    {
        "Field name": "is_active",
        "database": "accounts",
        "Field Description": "Active Flag"
    },
    {
        "Field name": "block_date",
        "database": "blocks",
        "Field Description": "The date of the Block. Used to partition the table"
    },
    {
        "Field name": "block_height",
        "database": "blocks",
        "Field Description": "The height of the Block"
    },
    {
        "Field name": "block_timestamp",
        "database": "blocks",
        "Field Description": "The timestamp of the Block in nanoseconds"
    },
    {
        "Field name": "block_timestamp_utc",
        "database": "blocks",
        "Field Description": "The timestamp of the Block in UTC"
    },
    {
        "Field name": "block_hash",
        "database": "blocks",
        "Field Description": "The hash of the Block"
    },
    {
        "Field name": "prev_block_hash",
        "database": "blocks",
        "Field Description": "The hash of the previous Block"
    },
    {
        "Field name": "total_supply",
        "database": "blocks",
        "Field Description": "The total supply of the Block"
    },
    {
        "Field name": "gas_price",
        "database": "blocks",
        "Field Description": "The gas price of the Block"
    },
    {
        "Field name": "author_account_id",
        "database": "blocks",
        "Field Description": "The AccountId of the author of the Block"
    },
    {
        "Field name": "block_date",
        "database": "chunks",
        "Field Description": "The date of the Block. Used to partition the table"
    },
    {
        "Field name": "block_height",
        "database": "chunks",
        "Field Description": "The height of the Block"
    },
    {
        "Field name": "block_timestamp",
        "database": "chunks",
        "Field Description": "The timestamp of the Block in nanoseconds"
    },
    {
        "Field name": "block_timestamp_utc",
        "database": "chunks",
        "Field Description": "The timestamp of the Block in UTC"
    },
    {
        "Field name": "block_hash",
        "database": "chunks",
        "Field Description": "The hash of the Block"
    },
    {
        "Field name": "chunk_hash",
        "database": "chunks",
        "Field Description": "The hash of the Chunk"
    },
    {
        "Field name": "shard_id",
        "database": "chunks",
        "Field Description": "The shard ID of the Chunk"
    },
    {
        "Field name": "signature",
        "database": "chunks",
        "Field Description": "The signature of the Chunk"
    },
    {
        "Field name": "gas_limit",
        "database": "chunks",
        "Field Description": "The gas limit of the Chunk"
    },
    {
        "Field name": "gas_used",
        "database": "chunks",
        "Field Description": "The amount of gas spent on computations of the Chunk"
    },
    {
        "Field name": "author_account_id",
        "database": "chunks",
        "Field Description": "The AccountId of the author of the Chunk"
    },
    {
        "Field name": "block_date",
        "database": "execution_outcomes",
        "Field Description": "The date of the Block. Used to partition the table"
    },
    {
        "Field name": "block_height",
        "database": "execution_outcomes",
        "Field Description": "The height of the Block"
    },
    {
        "Field name": "block_timestamp",
        "database": "execution_outcomes",
        "Field Description": "The timestamp of the Block in nanoseconds"
    },
    {
        "Field name": "block_timestamp_utc",
        "database": "execution_outcomes",
        "Field Description": "The timestamp of the Block in UTC"
    },
    {
        "Field name": "block_hash",
        "database": "execution_outcomes",
        "Field Description": "The hash of the Block"
    },
    {
        "Field name": "chunk_hash",
        "database": "execution_outcomes",
        "Field Description": "The hash of the Chunk"
    },
    {
        "Field name": "shard_id",
        "database": "execution_outcomes",
        "Field Description": "The shard ID of the Chunk"
    },
    {
        "Field name": "receipt_id",
        "database": "execution_outcomes",
        "Field Description": "The receipt ID"
    },
    {
        "Field name": "executed_in_block_hash",
        "database": "execution_outcomes",
        "Field Description": "The Block hash"
    },
    {
        "Field name": "outcome_receipt_ids",
        "database": "execution_outcomes",
        "Field Description": "Receipt IDs generated by this transaction or receipt"
    },
    {
        "Field name": "index_in_chunk",
        "database": "execution_outcomes",
        "Field Description": "The index in the Chunk"
    },
    {
        "Field name": "gas_burnt",
        "database": "execution_outcomes",
        "Field Description": "The amount of the gas burnt by the given transaction or receipt"
    },
    {
        "Field name": "tokens_burnt",
        "database": "execution_outcomes",
        "Field Description": "The amount of tokens burnt corresponding to the burnt gas amount. This value does not always equal to the \`gas_burnt\` multiplied by the gas price, because the prepaid gas price might be lower than the actual gas price and it creates a deficit"
    },
    {
        "Field name": "executor_account_id",
        "database": "execution_outcomes",
        "Field Description": "The id of the account on which the execution happens. For transaction this is signer_id, for receipt this is receiver_id"
    },
    {
        "Field name": "status",
        "database": "execution_outcomes",
        "Field Description": "Execution status. Contains the result in case of successful execution"
    },
    {
        "Field name": "logs",
        "database": "execution_outcomes",
        "Field Description": "Execution outcome logs"
    },
    {
        "Field name": "block_height",
        "database": "near_social_transactions",
        "Field Description": "The height of the Block"
    },
    {
        "Field name": "block_timestamp_utc",
        "database": "near_social_transactions",
        "Field Description": "The timestamp of the Block in UTC"
    },
    {
        "Field name": "block_date",
        "database": "near_social_transactions",
        "Field Description": "The date of the Block. Used to partition the table"
    },
    {
        "Field name": "signer_id",
        "database": "near_social_transactions",
        "Field Description": "An account on which behalf the origin transaction is signed"
    },
    {
        "Field name": "true_signer_id",
        "database": "near_social_transactions",
        "Field Description": "An account on which behalf the origin transaction is signed in case of action being delegated to relayer"
    },
    {
        "Field name": "predecessor_id",
        "database": "near_social_transactions",
        "Field Description": "The account ID which issued a receipt. In case of a gas or deposit refund, the account ID is system"
    },
    {
        "Field name": "receipt_id",
        "database": "near_social_transactions",
        "Field Description": "An unique id for the receipt"
    },
    {
        "Field name": "contract_id",
        "database": "near_social_transactions",
        "Field Description": "The contract ID"
    },
    {
        "Field name": "method_name",
        "database": "near_social_transactions",
        "Field Description": "The method name"
    },
    {
        "Field name": "deposit",
        "database": "near_social_transactions",
        "Field Description": "The deposit amount"
    },
    {
        "Field name": "gas",
        "database": "near_social_transactions",
        "Field Description": "The gas fee"
    },
    {
        "Field name": "account_object",
        "database": "near_social_transactions",
        "Field Description": "The account object"
    },
    {
        "Field name": "widget",
        "database": "near_social_transactions",
        "Field Description": "The account object edit widget"
    },
    {
        "Field name": "post",
        "database": "near_social_transactions",
        "Field Description": "The account object post or comment"
    },
    {
        "Field name": "profile",
        "database": "near_social_transactions",
        "Field Description": "The account object edit profile"
    },
    {
        "Field name": "graph",
        "database": "near_social_transactions",
        "Field Description": "The account object graph follow or hide"
    },
    {
        "Field name": "settings",
        "database": "near_social_transactions",
        "Field Description": "The account object settings"
    },
    {
        "Field name": "badge",
        "database": "near_social_transactions",
        "Field Description": "The account object badge"
    },
    {
        "Field name": "index",
        "database": "near_social_transactions",
        "Field Description": "The account object index like, follow, poke, comment, post, notify"
    },
    {
        "Field name": "block_date",
        "database": "receipt_actions",
        "Field Description": "The date of the Block. Used to partition the table"
    },
    {
        "Field name": "block_height",
        "database": "receipt_actions",
        "Field Description": "The height of the Block"
    },
    {
        "Field name": "block_timestamp",
        "database": "receipt_actions",
        "Field Description": "The timestamp of the Block in nanoseconds"
    },
    {
        "Field name": "block_timestamp_utc",
        "database": "receipt_actions",
        "Field Description": "The timestamp of the Block in UTC"
    },
    {
        "Field name": "block_hash",
        "database": "receipt_actions",
        "Field Description": "The hash of the Block"
    },
    {
        "Field name": "chunk_hash",
        "database": "receipt_actions",
        "Field Description": "The hash of the Chunk"
    },
    {
        "Field name": "shard_id",
        "database": "receipt_actions",
        "Field Description": "The shard ID of the Chunk"
    },
    {
        "Field name": "index_in_action_receipt",
        "database": "receipt_actions",
        "Field Description": "The index in the ACTION receipt"
    },
    {
        "Field name": "receipt_id",
        "database": "receipt_actions",
        "Field Description": "An unique id for the receipt"
    },
    {
        "Field name": "args",
        "database": "receipt_actions",
        "Field Description": "Arguments"
    },
    {
        "Field name": "receipt_predecessor_account_id",
        "database": "receipt_actions",
        "Field Description": "The account ID which issued a receipt. In case of a gas or deposit refund, the account ID is system"
    },
    {
        "Field name": "action_kind",
        "database": "receipt_actions",
        "Field Description": "The action kind: ADD_KEY, CREATE_ACCOUNT , DELEGATE_ACTION, DELETE_ACCOUNT, DELETE_KEY, DEPLOY_CONTRACT, FUNCTION_CALL, STAKE, TRANSFER"
    },
    {
        "Field name": "receipt_receiver_account_id",
        "database": "receipt_actions",
        "Field Description": "The destination account ID"
    },
    {
        "Field name": "is_delegate_action",
        "database": "receipt_actions",
        "Field Description": "Flag for delegate action"
    },
    {
        "Field name": "block_date",
        "database": "receipt_details",
        "Field Description": "The date of the Block. Used to partition the table"
    },
    {
        "Field name": "block_height",
        "database": "receipt_details",
        "Field Description": "The height of the Block"
    },
    {
        "Field name": "block_timestamp",
        "database": "receipt_details",
        "Field Description": "The timestamp of the Block in nanoseconds"
    },
    {
        "Field name": "block_timestamp_utc",
        "database": "receipt_details",
        "Field Description": "The timestamp of the Block in UTC"
    },
    {
        "Field name": "block_hash",
        "database": "receipt_details",
        "Field Description": "The hash of the Block"
    },
    {
        "Field name": "chunk_hash",
        "database": "receipt_details",
        "Field Description": "The hash of the Chunk"
    },
    {
        "Field name": "shard_id",
        "database": "receipt_details",
        "Field Description": "The shard ID of the Chunk"
    },
    {
        "Field name": "index_in_chunk",
        "database": "receipt_details",
        "Field Description": "The index in the Chunk"
    },
    {
        "Field name": "receipt_kind",
        "database": "receipt_details",
        "Field Description": "There are 2 types of Receipt: ACTION and DATA. An ACTION receipt is a request to apply Actions, while a DATA receipt is a result of the application of these actions"
    },
    {
        "Field name": "receipt_id",
        "database": "receipt_details",
        "Field Description": "An unique id for the receipt"
    },
    {
        "Field name": "data_id",
        "database": "receipt_details",
        "Field Description": "An unique DATA receipt identifier"
    },
    {
        "Field name": "predecessor_account_id",
        "database": "receipt_details",
        "Field Description": "The account ID which issued a receipt. In case of a gas or deposit refund, the account ID is system"
    },
    {
        "Field name": "receiver_account_id",
        "database": "receipt_details",
        "Field Description": "The destination account ID"
    },
    {
        "Field name": "receipt",
        "database": "receipt_details",
        "Field Description": "Receipt details"
    },
    {
        "Field name": "block_date",
        "database": "receipt_origin",
        "Field Description": "The date of the Block. Used to partition the table"
    },
    {
        "Field name": "block_height",
        "database": "receipt_origin",
        "Field Description": "The height of the Block"
    },
    {
        "Field name": "receipt_id",
        "database": "receipt_origin",
        "Field Description": "An unique id for the receipt"
    },
    {
        "Field name": "data_id",
        "database": "receipt_origin",
        "Field Description": "An unique DATA receipt identifier"
    },
    {
        "Field name": "receipt_kind",
        "database": "receipt_origin",
        "Field Description": "There are 2 types of Receipt: ACTION and DATA. An ACTION receipt is a request to apply Actions, while a DATA receipt is a result of the application of these actions"
    },
    {
        "Field name": "originated_from_transaction_hash",
        "database": "receipt_origin",
        "Field Description": "The transaction hash that originated the receipt"
    },
    {
        "Field name": "block_date",
        "database": "receipts",
        "Field Description": "The date of the Block. Used to partition the table"
    },
    {
        "Field name": "block_height",
        "database": "receipts",
        "Field Description": "The height of the Block"
    },
    {
        "Field name": "block_timestamp",
        "database": "receipts",
        "Field Description": "The timestamp of the Block in nanoseconds"
    },
    {
        "Field name": "block_timestamp_utc",
        "database": "receipts",
        "Field Description": "The timestamp of the Block in UTC"
    },
    {
        "Field name": "block_hash",
        "database": "receipts",
        "Field Description": "The hash of the Block"
    },
    {
        "Field name": "chunk_hash",
        "database": "receipts",
        "Field Description": "The hash of the Chunk"
    },
    {
        "Field name": "shard_id",
        "database": "receipts",
        "Field Description": "The shard ID of the Chunk"
    },
    {
        "Field name": "index_in_chunk",
        "database": "receipts",
        "Field Description": "The index in the Chunk"
    },
    {
        "Field name": "receipt_kind",
        "database": "receipts",
        "Field Description": "There are 2 types of Receipt: ACTION and DATA. An ACTION receipt is a request to apply Actions, while a DATA receipt is a result of the application of these actions"
    },
    {
        "Field name": "receipt_id",
        "database": "receipts",
        "Field Description": "An unique id for the receipt"
    },
    {
        "Field name": "data_id",
        "database": "receipts",
        "Field Description": "An unique DATA receipt identifier"
    },
    {
        "Field name": "predecessor_account_id",
        "database": "receipts",
        "Field Description": "The account ID which issued a receipt. In case of a gas or deposit refund, the account ID is system"
    },
    {
        "Field name": "receiver_account_id",
        "database": "receipts",
        "Field Description": "The destination account ID"
    },
    {
        "Field name": "receipt",
        "database": "receipts",
        "Field Description": "Receipt details"
    },
    {
        "Field name": "originated_from_transaction_hash",
        "database": "receipts",
        "Field Description": "The transaction hash that originated the receipt"
    },
    {
        "Field name": "transaction_signer_account_id",
        "database": "receipts",
        "Field Description": "An account on which behalf the origin transaction is signed"
    },
    {
        "Field name": "transaction_signer_public_key",
        "database": "receipts",
        "Field Description": "An access key which was used to sign the origin transaction"
    },
    {
        "Field name": "transaction_status",
        "database": "receipts",
        "Field Description": null
    },
    {
        "Field name": "execution_outcome_executed_in_block_hash",
        "database": "receipts",
        "Field Description": "The execution outcome Block hash"
    },
    {
        "Field name": "execution_outcome_receipt_ids",
        "database": "receipts",
        "Field Description": "The execution outcome Receipt IDs generated by the transaction or receipt"
    },
    {
        "Field name": "execution_outcome_gas_burnt",
        "database": "receipts",
        "Field Description": "The execution outcome amount of the gas burnt by the given transaction or receipt"
    },
    {
        "Field name": "execution_outcome_tokens_burnt",
        "database": "receipts",
        "Field Description": "The execution outcome amount of tokens burnt corresponding to the burnt gas amount. This value does not always equal to the \`gas_burnt\` multiplied by the gas price, because the prepaid gas price might be lower than the actual gas price and it creates a deficit"
    },
    {
        "Field name": "execution_outcome_executor_account_id",
        "database": "receipts",
        "Field Description": "The execution outcome id of the account on which the execution happens. For transaction this is signer_id, for receipt this is receiver_id"
    },
    {
        "Field name": "execution_outcome_status",
        "database": "receipts",
        "Field Description": "The execution outcome status. Contains the result in case of successful execution"
    },
    {
        "Field name": "block_date",
        "database": "transactions",
        "Field Description": "The date of the Block. Used to partition the table"
    },
    {
        "Field name": "block_height",
        "database": "transactions",
        "Field Description": "The height of the Block"
    },
    {
        "Field name": "block_timestamp",
        "database": "transactions",
        "Field Description": "The timestamp of the Block in nanoseconds"
    },
    {
        "Field name": "block_timestamp_utc",
        "database": "transactions",
        "Field Description": "The timestamp of the Block in UTC"
    },
    {
        "Field name": "block_hash",
        "database": "transactions",
        "Field Description": "The hash of the Block"
    },
    {
        "Field name": "chunk_hash",
        "database": "transactions",
        "Field Description": "The hash of the Chunk"
    },
    {
        "Field name": "shard_id",
        "database": "transactions",
        "Field Description": "The shard ID of the Chunk"
    },
    {
        "Field name": "transaction_hash",
        "database": "transactions",
        "Field Description": "The transaction hash"
    },
    {
        "Field name": "index_in_chunk",
        "database": "transactions",
        "Field Description": "The index in the Chunk"
    },
    {
        "Field name": "signer_account_id",
        "database": "transactions",
        "Field Description": "An account on which behalf transaction is signed"
    },
    {
        "Field name": "signer_public_key",
        "database": "transactions",
        "Field Description": "An access key which was used to sign a transaction"
    },
    {
        "Field name": "nonce",
        "database": "transactions",
        "Field Description": "Nonce is used to determine order of transaction in the pool. It increments for a combination of \`signer_id\` and \`public_key\`"
    },
    {
        "Field name": "receiver_account_id",
        "database": "transactions",
        "Field Description": "Receiver account for this transaction"
    },
    {
        "Field name": "signature",
        "database": "transactions",
        "Field Description": "A signature of a hash of the Borsh-serialized Transaction"
    },
    {
        "Field name": "status",
        "database": "transactions",
        "Field Description": "Transaction status"
    },
    {
        "Field name": "converted_into_receipt_id",
        "database": "transactions",
        "Field Description": "Receipt ID that the transaction was converted."
    },
    {
        "Field name": "receipt_conversion_gas_burnt",
        "database": "transactions",
        "Field Description": "Gas burnt in the receipt conversion"
    },
    {
        "Field name": "receipt_conversion_tokens_burnt",
        "database": "transactions",
        "Field Description": "Tokens burnt in the receipt conversion"
    }
]
    
A user will ask you a question about the data base. You should provide the SQL query (in the GoogleSQL dialect) that will provide the data to answer the question. YOU SHOULD ONLY PROVIDE THE SQL QUERY and no extra info. You should not greet the user or explain the query. YOU SHOULD NOT prefix the answer with 'sql' or anything similar. The query will be copied and ran by the user.

Always include number values as type 'NUMERIC' instead of type 'INT64'. You can achieve this by writing '.0' at the end of every number which will convert it to 'NUMERIC'. 

ALL THE QUERIES WILL ONLY REQUIRE THE LAST 7 DAYS OF DATA SO ALWAYS END THE QUERY WITH:
"WHERE block_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)"
`,
    };
}

export function getFewShotExamples(): ChatCompletionMessageParam[] {
    return [
        { role: 'user', content: 'how many wallets were created past 7 days?' },
        {
            role: 'assistant',
            content:
                'SELECT COUNT(DISTINCT signer_account_id) FROM bigquery-public-data.crypto_near_mainnet_us.transactions WHERE block_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE()',
        },
        {
            role: 'user',
            content:
                'how many wallets were created past 7 days did 1 transaction?',
        },
        {
            role: 'assistant',
            content:
                'SELECT count(DISTINCT signer_account_id) FROM bigquery-public-data.crypto_near_mainnet_us.transactions WHERE block_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() and signer_account_id in (SELECT receipt_receiver_account_id FROM bigquery-public-data.crypto_near_mainnet_us.receipt_actions WHERE action_kind="CREATE_ACCOUNT" and block_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE()))',
        },
        {
            role: 'user',
            content:
                'how many wallets were created past 7 days did 3 transactions?',
        },
        {
            role: 'assistant',
            content:
                'WITH CreatedAccounts AS (SELECT receipt_receiver_account_id FROM bigquery-public-data.crypto_near_mainnet_us.receipt_actions WHERE action_kind = "CREATE_ACCOUNT" AND block_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE()), TransactionsPerAccount AS ( SELECT signer_account_id, COUNT(*) AS transaction_count FROM bigquery-public-data.crypto_near_mainnet_us.transactions WHERE block_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE() GROUP BY signer_account_id) SELECT COUNT(DISTINCT t.signer_account_id) FROM TransactionsPerAccount AS t JOIN CreatedAccounts AS c ON t.signer_account_id = c.receipt_receiver_account_id WHERE t.transaction_count >= 3',
        },
        {
            role: 'user',
            content:
                'How many wallets sent more than 10 Near in the past 7 days (pure native Near transfer)?',
        },
        {
            role: 'assistant',
            content:
                'SELECT count(distinct(receipt_predecessor_account_id)) as wallet_id FROM bigquery-public-data.crypto_near_mainnet_us.receipt_actions WHERE action_kind = "TRANSFER" AND CAST(JSON_EXTRACT_SCALAR(args, "$.deposit") as BIGNUMERIC) > CAST("10000000000000000000000000" as BIGNUMERIC) AND block_date > DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY) LIMIT 1',
        },
    ];
}

export async function getResponse(
    chatHistory: ChatCompletionMessageParam[]
): Promise<ChatCompletionMessageParam[]> {
    const messages = [...chatHistory];

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-1106',
        messages: messages,
    });

    const message = response.choices[0].message;

    messages.push(message);

    return messages;
}
