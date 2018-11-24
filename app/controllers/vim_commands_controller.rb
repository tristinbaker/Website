class VimCommandsController < ApplicationController

  layout 'vim_commands'

  def index 
    @vim_types = VimType.all.exclude_non_commands
  end

end
