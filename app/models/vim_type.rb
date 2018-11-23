class VimType < ApplicationRecord
  has_many :vim_commands
  has_many :vimrcs

  scope :exclude_non_vimrc,-> {where(classifier: "Vimrc") }
  scope :exclude_non_commands,-> {where(classifier: "Commands") }
end
