class CreateApiKeys < ActiveRecord::Migration[6.1]
  def change
    create_table :api_keys do |t|
      t.string :token, null: false
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
