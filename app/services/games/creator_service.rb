module Games
  class CreatorService
    def initialize(owner)
      @owner = owner
    end

    def call
      game = nil

      Game.transaction do
        game = Game.create! owner: @owner
        9.times do |idx|
          Step.create!(game: game, position: idx + 1, symbol: '.')
        end

        game.reload
      end

      game
    end
  end
end
