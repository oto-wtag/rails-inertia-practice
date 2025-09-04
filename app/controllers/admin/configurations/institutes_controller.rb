# frozen_string_literal: true

include Pagy::Backend

class Admin::Configurations::InstitutesController < InertiaController
  before_action :require_admin
  # before_action :set_institution, only: [:destroy]

  def index
    @countries = Country.all.order(:name)
    @q = Institute.ransack(params[:q])
    @pagy, @institutes = pagy(@q.result.includes(:country).order(created_at: :desc), limit: 10)

    institutes_list = {
      institutes: @institutes.as_json(include: {country: {only: [:id, :name, :code]}}),
      pagination: {
        page: @pagy.page,
        count: @pagy.count,
        pages: @pagy.pages,
        next: @pagy.next,
        prev: @pagy.prev
      },
      q: params[:q]
    }

    render inertia: "admin/configurations/institutes/index", props: {institutesList: institutes_list, countries: @countries.as_json}
  end

  def create
    @institute = Institute.new(institute_params)
    @institute.created_by = current_user

    if @institute.save
      redirect_to admin_configurations_institutes_path, notice: "Institute added successfully"
    else
      redirect_to admin_configurations_institutes_path, inertia: inertia_errors(@institute)
    end
  end

  # def destroy
  #   if @country.destroy
  #     redirect_to admin_configurations_countries_path, notice: "Country deleted successfully"
  #   else
  #     redirect_to admin_configurations_countries_path, alert: "Failed to delete country"
  #   end
  # rescue ActiveRecord::RecordNotFound
  #   redirect_to admin_configurations_countries_path, alert: "Country not found"
  # end

  private

  # def set_country
  #   @country = Country.find(params[:id])
  # rescue ActiveRecord::RecordNotFound
  #   redirect_to admin_configurations_countries_path, alert: "Country not found"
  # end

  def institute_params
    params.permit(:name, :country_id, :city, :picture, :description)
  end
end
