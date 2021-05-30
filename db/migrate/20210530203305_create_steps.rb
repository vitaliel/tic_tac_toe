class CreateSteps < ActiveRecord::Migration[6.1]
  def change
    create_table :steps do |t|
      t.references :game, null: false, foreign_key: true
      t.references :player, foreign_key: { to_table: :users }
      t.integer :symbol, null: false, default: 0
      t.integer :position, null: false, default: 0
      t.timestamps
    end
  end
end
