class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.references :owner, null: false, foreign_key: { to_table: :users }
      t.integer :status, null: false, default: 0
      t.references :player, foreign_key: { to_table: :users }
      t.references :next_player, foreign_key: { to_table: :users }
      t.references :win_player, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
