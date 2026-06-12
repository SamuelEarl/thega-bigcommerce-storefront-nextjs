# Getting Started With BigCommerce Headless Commerce

The docs for headless commerce start here: **[Introduction to Headless Commerce](https://docs.bigcommerce.com/developer/docs/storefront/headless/overview)**. So that is where you want to start.

## How your app integrates with BigCommerce

See [Sample Integration](https://docs.bigcommerce.com/developer/docs/storefront/headless/overview#sample-integration)

There are 3 parts to this integration:

1. Your store's frontend. (The diagram in the docs calls this the "Storefront".)
2. Your store's backend API. For a Next.js app, your backend API would be your API endpoints. (The diagram in the docs calls this the "Application" and the docs refer to this as a "proxy server".)
3. BigCommerce's REST Storefront API or GraphQL Storefront API. (The diagram in the docs calls this "BigCommerce".)

This is how data flows through these 3 parts:

1. A user performs an action in your storefront. (e.g. They navigate to a category or product page, filter products, add a product to their cart, checkout, or login.)
2. You send data from that user action to your backend API. (e.g. Pass the URL that contains category or product data to the backend, pass cart data to the backend, pass user credentials to the backend.)
3. Your backend API has endpoints that are configured to receive those data and send them to the appropriate BigCommerce Storefront API endpoint where category or product data can be retrieved, products can be added to the cart, user credentials can be authenticated, etc.
4. BigCommerce responds to your backend API with the requested data, and then your backend API forwards that response to your storefront where the user sees the results of their action.

## Create a channel

A BigCommerce channel is any storefront, marketplace, point-of-sale (POS) system, or advertising platform where you sell and promote your products. If you have multiple location where you sell and promote products, then you will need to create a channel for each location. The BigCommerce Control Panel allows you to manage your entire omnichannel operation—including product listings, inventory, and orders—from one central dashboard.

How to create a channel for your headless storefront:

TODO: These steps are not complete. I need to figure out how to do this for a demo storefront.

1. Log into your BigCommerce Control Panel.
2. Click on **Channels** (or **Channels** > **Channel Manager**) in the navigation menu, in the left sidebar.
3. Inside the "Storefronts" section, click **+ Add new**.
4. You will be redirected to the "Storefronts" section of the "Add new channel" page.
5. Click the "Create" button to the right of "BigCommerce".
6. Give your storefront a name, select your language, and click "Create".

## Create a Free Developer Sandbox

Go to https://start.bigcommerce.com/developer-sandbox/ and fill out the form to create a free developer sandbox.

## Trusted Proxy Configuration

Your backend API will act as a proxy server that sits between your storefront and BigCommerce's Storefront API. 

How it works:

1. You will deploy your backend API. This is the same as any other deployment for your backend code.
2. When a request from your storefront reaches your backend API, your backend API will forward that request to BigCommerce's Storefront API along with two extra headers:
    1. `X-BC-Trusted-Proxy-Secret`: A secret key to authenticate the proxy. 
        1. You have to request this secret key from BigCommerce support and store it in your `.env` file.
        2. Include the secret in the `X-BC-Trusted-Proxy-Secret` header
    2. `True-Client-IP`: The remote user’s original IP address. You will configure your backend API to extract the user's original IP address from the request headers and forward it to BigCommerce's Storefront API in this header.

## Group related requests together

Some operations may require several API calls. For example, processing a payment and refunding an order each require reading and writing information using multiple endpoints. When you perform a multi-part operation on a headless storefront, you should group those related requests together using the `X-Correlation-Id` header. This is how it's done:

1. Generate a UUID that will represent the entire operation.
2. Send that UUID in the `X-Correlation-Id` request header with every request in the group.

This helps BigCommerce track the handoff from request to request as the operation moves through their servers.

For information on how to send these headers in your GraphQL requests, search for "how to send http headers in graphql request".

For more details, as well as an example using the GraphQL Storefront API, see [Correlating requests](https://docs.bigcommerce.com/developer/docs/storefront/headless/overview#correlating-requests).

## How to handle customer logins

Your storefront will be on one domain (probably your main domain, e.g. mystore.com) and your BigCommerce checkout needs to be configured on a different domain (e.g. checkout.mystore.com). When an authenticated customer clicks "checkout" in your storefront, they will be redirected to the BigCommerce checkout on the different domain. This could cause issues with customer logins where the customer is authenticated on your storefront but not on your checkout page. However, BigCommerce uses a JWT-based "Session Sync" to transfer session details, such as customer and cart data, across domains. 

The "Session Sync" uses a [Customer Access Token](https://docs.bigcommerce.com/developer/docs/storefront/guides/graphql-storefront-api/authentication#customer-access-tokens), but I am not sure if the user has to be logged into your storefront for this to work or not. For more details and an example of how to use it, see [Headless/GraphQL account login](https://docs.bigcommerce.com/developer/docs/storefront/headless/overview#headlessgraphql-account-login) as well as the section after it ([Persisting analytics session IDs](https://docs.bigcommerce.com/developer/docs/storefront/headless/overview#persisting-analytics-session-ids)). The example uses a `$visitorId` parameter instead of a `$userId` parameter, so that makes me wonder if the user has to be logged into the storefront for this to work. 

## How to Create a Private API Token

For headless BigCommerce sites you will need to use either the REST Storefront API or the GraphQL Storefront API to interface with your BigCommerce store. (The GraphQL Storefront API appears to be therecommended option.) These storefront APIs require a private API token. To create a BigCommerce private API token for server-to-server Storefront API requests, you must (1) generate store-level API tokens and then (2) use some of those tokens to generate a private API token.

### Step 1: Create a Store-Level API Account

First, you need an API account that has the authority to manage Storefront API tokens. You must log in as the Store Owner to do this.

1. Log into your BigCommerce Control Panel.
2. Navigate to **Settings** > **API** > **Store-level API accounts**.
3. Click **+ Create API Account**.
4. Set the Token Type to **V2/V3 API token**.
5. Enter a descriptive **Name** (e.g., "Private Token Generator").
6. Under _OAuth Scopes_, scroll to **Storefront API Tokens** and set it to **Manage**.
7. Click **Save**.
8. A `.txt` file containing your `ACCESS TOKEN`, `CLIENT ID`, `CLIENT SECRET`, and `API PATH` will automatically download. Save this file securely, as the access token will never be shown again.

### Step 2: Request the Private API Token

Private tokens are stateless and designed for server-to-server use cases. You can generate a private token in one of two ways:

#### Option 1: Use the API Reference User Interface

1. Go to the [Create a Private API Token](https://docs.bigcommerce.com/developer/api-reference/rest/admin/authentication-apis/storefront-api-tokens/private-api-token/create-private-token) page.
2. Click the "Try it" button to pull up an interactive interface where you can generate a private token.
3. In the "Enter your credentials (X-Auth-Token)" field, click the "Edit" button and enter your ACCESS TOKEN from the `.txt` file you downloaded in Step 1.
4. Under the "Path parameters" section, replace `store_hash` with the store hash found in the API Path from the `.txt` file in Step 1. To find your store hash:
    1. Locate the API Path in the `.txt` file you downloaded in Step 1. 
        1. Your store hash should be a 10-character string after the `/stores/` segment of the API Path.
    2. Or you can:
        1. Log into your BigCommerce Control Panel.
        2. In the URL bar of your browser, you will see a `store-xxxxxxxxxx.mybigcommerce.com`. The `xxxxxxxxxx` in the subdomain is your store hash.
5. Under the "Body parameters" section, replace `channel_id` with the channel ID for your storefront. To find your channel ID:
    1. Log into your BigCommerce Control Panel.
    2. Navigate to **Channels**.
    3. Click on the name of the storefront for which you want to generate a private token.
    4. In the URL bar of your browser, you will see the `/channel/` segment followed by a number. This number is the channel ID.
6. Click the "Send request" button.
7. The API will return a JSON object containing a `token` field with a JWT string. This is your **PRIVATE API TOKEN**.

#### Option 2: Request the Token Programmatically

You must use your master API credentials to create one programmatically.

Use an API client (like Postman, cURL, or your server-side code) to make a POST request to the BigCommerce Admin API to issue the private token.

This is an example using cURL:

```bash
curl -X POST https://api.bigcommerce.com/stores/{store_hash}/v3/storefront/api-token-private \
     -H "X-Auth-Token: {ACCESS TOKEN}" \
     -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{
  "expires_at": 1885635176,
  "scopes": [
    "Unauthenticated",
    "Customer"
  ],
  "channel_id": 1
}'
```

You will need to replace the `store_hash`, `ACCESS TOKEN`, and `channel_id` with your own values. See the explanations under Option 1 for steps to find these values.

### Step 3: Store and Use the Token

Create the following values in your `.env` file and populate them with your own values:

```bash
TRUSTED_PROXY_SECRET = 
# NAME / CLIENT NAME: Private Token Generator
ACCESS_TOKEN = 
CLIENT_ID = 
CLIENT_SECRET = 
API_PATH = 
STORE_HASH = 
CHANNEL_ID = 
# Private API Token (aka GraphQL Storefront API token???)
PRIVATE_API_TOKEN = 
```

Keep in mind that BigCommerce will reject private token requests that originate from web browsers. You should only pass this token via server-to-server operations (such as a Next.js or Node.js backend) to communicate securely with the [BigCommerce GraphQL Storefront API](https://docs.bigcommerce.com/developer/docs/storefront/guides/graphql-storefront-api/authentication).
