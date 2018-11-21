class AddHiddenAttributeToVimCommands < ActiveRecord::Migration[5.2]
  def change
    add_column :vim_commands, :hidden_attributes, :string
  end
end
