const httpClient = require('./src/http')
const { generateRandom } = require('./src/utils')

const DEFAULT_STATE = generateRandom(20)

module.exports = class OAuth {
  constructor ({ scope, redirect, client, auth, state }) {
    // client: { id, secret }
    // auth: { authorizeHost, authorizePath, tokenHost, tokenPath }
    this.scope = scope.join(' ')
    this.redirect = redirect
    this.client = client
    this.authorizeEndPoint = auth.authorizeHost + auth.authorizePath
    this.tokenEndPoint = auth.tokenHost + auth.tokenPath
    this.$http = httpClient
    this.state = state || DEFAULT_STATE
  }

  /**
   * getAuthorizeURL
   *
   * Return url for authentication
   * @param {Object} [parameters] - Additional params in the path
   */
  async getAuthorizeURL (parameters = {}) {
    const params = {
      client_id: this.client.id,
      redirect_uri: this.redirect,
      response_type: 'code',
      scope: this.scope,
      state: this.state,
      ...parameters
    }

    return this.authorizeEndPoint + '?' + this.$http.encode(params)
  }

  /**
   * createToken
   *
   * Return { accesss_token, refresh_token, expires_in }
   * @param {string} code
   * @doc https://www.oauth.com/oauth2-servers/access-tokens/authorization-code-request/
   */
  async createToken (code) {
    const body = {
      grant_type: 'authorization_code',
      code: code,
      client_id: this.client.id,
      client_secret: this.client.secret,
      redirect_uri: this.redirect
    }

    return this.$http({
      method: 'POST',
      url: this.tokenEndPoint,
      body
    })
  }

  /**
   * getRefreshToken
   *
   * Return valid token
   * @param {Object} token
   * @doc https://www.oauth.com/oauth2-servers/access-tokens/refreshing-access-tokens/
   */
  async getRefreshToken (token) {
    const body = {
      grant_type: 'refresh_token',
      client_id: this.client.id,
      client_secret: this.client.secret,
      refresh_token: token.refresh_token
    }

    // ToDo Control Error: status: 400 { error: 'invalid_grant', error_description: 'Bad Request' }

    return this.$http({
      method: 'POST',
      url: this.tokenEndPoint,
      body
    })
  }
}
