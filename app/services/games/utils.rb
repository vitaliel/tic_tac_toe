module Games
  module Utils
    def self.check_positions(positions)
      raise ArgumentError if positions.size != 9
      # horizontal lines
      3.times do |idx|
        start = idx * 3
        line = positions[start, 3]
        return true if line == 'XXX' || line == 'OOO'
      end
      # vertical lines
      3.times do |idx|
        line = [positions[idx], positions[idx + 3], positions[idx + 6]].join
        return true if line == 'XXX' || line == 'OOO'
      end

      # First diagonal
      line = [positions[0], positions[4], positions[8]].join
      return true if line == 'XXX' || line == 'OOO'
      # Second diagonal
      line = [positions[2], positions[4], positions[6]].join
      return true if line == 'XXX' || line == 'OOO'

      false
    end
  end
end
