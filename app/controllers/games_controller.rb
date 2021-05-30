class GamesController < ApplicationController
  before_action :authenticated

  def show
    @game = Game.find(params[:id])
    jsend_success GameEntity.new(@game).as_json
  end

  def create
    game = Game.new owner: current_user

    if game.save
      jsend_success GameEntity.new(game).as_json
    else
      jsend_error game.errors.to_s
    end
  end

  def join
    Game.transaction do
      @game = Game.find(params[:id])
      result = Games::JoinService.new.call(game: @game, user: current_user)

      if result.success?
        jsend_success GameEntity.new(result.value!).as_json
      else
        jsend_error result.failure
      end
    end
  end

  def make_move
    Game.transaction do
      @game = Game.find(params[:id])
      # TODO
      # check if game is in playing status
      # check if next_player is current_user
      # check if position is empty
      # create position
      # check if game is finished: no more moves or line/vertical/diagonal with the same symbol
      #
    end
  end
end
