class VimCommandsController < ApplicationController

  layout 'welcome'

  def index 
    @vim_types = VimType.all.exclude_non_commands
  end

end
