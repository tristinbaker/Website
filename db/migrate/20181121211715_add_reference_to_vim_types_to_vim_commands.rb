class AddReferenceToVimTypesToVimCommands < ActiveRecord::Migration[5.2]
  def change
    add_reference :vim_commands, :vim_type, foreign_key: true
  end
end
