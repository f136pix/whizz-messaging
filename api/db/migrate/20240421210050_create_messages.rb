class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.string :msgID, null: false
      t.string :textMsg, limit: 200, null: false
      t.datetime :createDate, null: false
      t.datetime :scheduleDate, null: false
      t.string :whatsappNumber, null: false

    end
    add_index :messages, :msgID, unique: true
  end
end