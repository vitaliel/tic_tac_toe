require "dry/transaction"

module Games
  class PlayService
    include Dry::Transaction

    step :check_status
    step :check_next_player
    step :check_position_int
    step :check_position
    step :update_position
    step :change_next_player
    step :game_finished
    step :check_game_final_status

    private

    # check if game is in playing status
    def check_status(input)
      if input[:game].status == 'playing'
        Success(input)
      else
        Failure('Game is not in playing status')
      end
    end

    # check if next_player is current_user
    def check_next_player(input)
      if input[:game].next_player_id == input[:user].id
        Success(input)
      else
        Failure("Unexpected move from #{input[:user].login}")
      end
    end

    # check if position is integer between 1..9
    def check_position_int(input)
      step = input[:step]
      position = step[:position].to_i

      if (1..9).include?(position)
        Success(input)
      else
        Failure('Position should be in interval 1..9')
      end
    end

    # check if position is empty
    def check_position(input)
      position = input[:step][:position].to_i
      db_step = input[:game].steps.detect { |x| x.position == position }

      if db_step.symbol == '.'
        Success(input)
      else
        Failure("Position #{position} is not empty")
      end
    end

    def update_position(input)
      game = input[:game]
      user = input[:user]
      position = input[:step][:position].to_i
      symbol = game.owner_id == user.id ? 'O' : 'X'
      step = game.steps.detect { |x| x.position == position }
      step.symbol = symbol
      step.player = user

      if step.save
        Success(input)
      else
        Failure("Can not save step: #{step.errors}")
      end
    end

    def change_next_player(input)
      game = input[:game]
      user = input[:user]
      game.next_player_id = game.owner_id == user.id ? game.player_id : game.owner_id

      if game.save
        Success(input)
      else
        Failure("Can not save game: #{game.errors}")
      end
    end

    def game_finished(input)
      game = input[:game]

      if game.steps.filter { |step| step.symbol == '.' }.blank?
        game.status = :finished
        game.save!
      end

      Success(input)
    end

    # check if game can be finished
    def check_game_final_status(input)
      game = input[:game]
      return Success(game) if game.steps.filter { |step| step.symbol != '.' }.size < 5

      user = input[:user]
      positions = input[:game].steps.pluck(:symbol).join

      if Games::Utils.check_positions(positions)
        game.win_player = user
        game.status = :finished
        game.save!
      end

      ActionCable.server.broadcast(
        "game_#{game.id}",
        {
          game: GameEntity.represent(game),
          action: 'makeMove',
        }
      )

      Success(game)
    end
  end
end
