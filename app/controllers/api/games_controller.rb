module Api
  class GamesController < ApplicationController
    before_action :authenticated

    def show
      @game = authorize Game.find(params[:id])
      jsend_success GameEntity.represent(@game)
    end

    def index
      games = policy_scope(Game).order(id: :desc)
      jsend_success GameEntity.represent(games)
    end

    def create
      game = Games::CreatorService.new(current_user).call
      jsend_success GameEntity.represent(game)
    end

    def join
      Game.transaction do
        @game = Game.find(params[:id])
        result = Games::JoinService.new.call(game: @game, user: current_user)

        if result.success?
          jsend_success GameEntity.represent(result.value!)
        else
          jsend_error result.failure
        end
      end
    end

    def make_move
      Game.transaction do
        @game = Game.find(params[:id])
        result = Games::PlayService.new.call(game: @game, user: current_user, step: step_params)

        if result.success?
          jsend_success GameEntity.represent(result.value!)
        else
          jsend_error result.failure
        end
      end
    end

    private

    def step_params
      params.require(:step).permit(:position)
    end
  end
end
