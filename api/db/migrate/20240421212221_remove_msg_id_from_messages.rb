class RemoveMsgIdFromMessages < ActiveRecord::Migration[6.1]
  def change
    remove_column :messages, :msgID, :string
  end
end
