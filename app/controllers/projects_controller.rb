class ProjectsController < ApplicationController

  layout 'welcome'

  def index
    @projects = Project.all
  end

  private

end
