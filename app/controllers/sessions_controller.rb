# frozen_string_literal: true

class SessionsController < InertiaController
  skip_before_action :authenticate, only: %i[ new create ]
  before_action :require_no_authentication, only: %i[ new create ]
  before_action :set_session, only: :destroy

  def new
  end

  def create
    if user = User.authenticate_by(email: params[:email], password: params[:password])
      @session = user.sessions.create!
      cookies.signed.permanent[:session_token] = {value: @session.id, httponly: true}

      if user.admin?
        redirect_to dashboard_path, notice: "Welcome back!"
      else
        redirect_to root_path, notice: "Welcome back!"
      end
    else
      redirect_to sign_in_path, alert: "That email or password is incorrect"
    end
  end

  def destroy
    @session.destroy!
    Current.session = nil
    redirect_to root_path, notice: "You have been logged out", inertia: {clear_history: true}
  end

  private

  def set_session
    @session = Current.user.sessions.find(params[:id])
  end
end
