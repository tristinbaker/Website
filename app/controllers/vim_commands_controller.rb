class VimCommandsController < ApplicationController

  layout 'vim_command'

  def index 
    @vim_types = VimType.all.exclude_non_commands
  end

end
