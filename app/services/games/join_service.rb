require "dry/transaction"

module Games
  class JoinService
    include Dry::Transaction

    step :validate_status
    step :validate_player
    step :update

    private

    def validate_status(input)
      game = input[:game]

      if game.status == 'created'
        Success(input)
      else
        Failure('Game already has both players')
      end
    end

    def validate_player(input)
      game = input[:game]
      user = input[:user]

      if game.owner_id != user.id
        Success(input)
      else
        Failure('Game owner can not join')
      end
    end

    def update(input)
      game = input[:game]
      user = input[:user]

      game.player = user
      game.next_player = [user, game.owner].sample
      game.status = :playing

      if game.save
        Success(game)
      else
        Failure('Cannot save game')
      end
    end
  end
end
