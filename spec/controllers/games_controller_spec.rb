require 'rails_helper'

RSpec.describe GamesController do
  let(:user) { create(:user) }
  let(:game) { create(:game, owner: user) }
  let(:api_key) { ApiKey.for_user(user) }

  describe '#show' do
    context 'when api token is valid' do
      before do
        request.headers['X-Token'] = api_key.token
      end

      it 'shows the game in json' do
        get :show, params: { id: game.id }, format: :json
        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['data']['id']).to eq game.id
      end
    end

    context 'when api token is invalid' do
      before do
        request.headers['X-Token'] = 'beef'
      end

      it 'fails' do
        get :show, params: { id: game.id }, format: :json
        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['status']).to eq 'error'
        expect(json['message']).to eq 'Access denied: need to login'
      end
    end
  end

  describe '#create' do
    before do
      request.headers['X-Token'] = api_key.token
    end

    it 'creates' do
      expect do
        post :create, params: { }, format: :json
        expect(response).to have_http_status(:ok)
      end.to change(Game, :count)

      json = JSON.parse(response.body)
      expect(json['data']['id']).to eq Game.last.id
    end
  end

  describe '#join' do
    let(:bob) { create(:user) }
    let(:game) { create(:game, owner: bob) }

    before do
      request.headers['X-Token'] = api_key.token
    end

    it 'joins' do
      put :join, params: { id: game.id }, format: :json
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['data']['id']).to eq game.id
      expect(json['data']['player']['id']).to eq user.id
      game.reload
      expect(game.status).to eq 'playing'
    end
  end
end
