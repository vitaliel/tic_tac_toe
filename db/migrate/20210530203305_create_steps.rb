class CreateSteps < ActiveRecord::Migration[6.1]
  def change
    create_table :steps do |t|
      t.references :game, null: false, foreign_key: true
      t.references :player, foreign_key: { to_table: :users }, null: true
      t.string :symbol, null: false, default: '.'
      t.integer :position, null: false
      t.timestamps
    end
  end
end
