class VimCommand < ApplicationRecord
  belongs_to :vim_type

  scope :sort_by_weight, -> {order(weight: :desc) }

end
