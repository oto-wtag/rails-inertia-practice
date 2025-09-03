# frozen_string_literal: true

class AboutController < InertiaController
  skip_before_action :authenticate
  before_action :perform_authentication

  def index
  end
end
