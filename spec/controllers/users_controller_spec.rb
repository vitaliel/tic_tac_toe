require 'rails_helper'

RSpec.describe UsersController do
  let(:user) { create(:user) }
  let(:api_key) { ApiKey.for_user(user) }

  context 'when user wants to login' do
    before do
      user
    end

    it 'logins' do
      post :login, params: { user: { login: user.login, password: '123' } }, format: :json
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['status']).to eq 'success'
      expect(json['data']['token']).not_to be_blank
      expect(json['data']['user']).to eq({ "id" => user.id, "login" => user.login })
    end

    it 'fails to login' do
      post :login, params: { user: { login: user.login, password: '123-some' } }, format: :json
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['status']).to eq 'error'
      expect(json['message']).to eq 'login or password is incorrect'
    end
  end

  context 'when checking access token' do
    context 'when valid token' do
      before do
        request.headers['X-Token'] = api_key.token
      end

      it 'succeeds' do
        get :me
        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['data']['user']).to eq({ "id" => user.id, "login" => user.login })
      end
    end

    context 'when invalid token' do
      it 'fails' do
        get :me
        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['status']).to eq 'error'
        expect(json['message']).to eq 'Access denied: need to login'
      end
    end
  end
end
