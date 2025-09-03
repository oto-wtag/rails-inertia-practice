# frozen_string_literal: true

include Pagy::Backend

class Admin::Configurations::CountriesController < InertiaController
  before_action :require_admin
  before_action :set_country, only: [:destroy]

  def index
    @q = Country.ransack(params[:q])
    @pagy, @countries = pagy(@q.result.order(created_at: :desc), limit: 10)

    country_list = {
      countries: @countries.as_json,
      pagination: {
        page: @pagy.page,
        count: @pagy.count,
        pages: @pagy.pages,
        next: @pagy.next,
        prev: @pagy.prev
      },
      q: params[:q]
    }

    render inertia: "admin/configurations/countries/index", props: {countryList: country_list}
  end

  def create
    @country = Country.new(country_params)
    @country.created_by = current_user

    if @country.save
      redirect_to admin_configurations_countries_path, notice: "Country created successfully"
    else
      redirect_to admin_configurations_countries_path, inertia: inertia_errors(@country)
    end
  end

  def destroy
    if @country.destroy
      redirect_to admin_configurations_countries_path, notice: "Country deleted successfully"
    else
      redirect_to admin_configurations_countries_path, alert: "Failed to delete country"
    end
  rescue ActiveRecord::RecordNotFound
    redirect_to admin_configurations_countries_path, alert: "Country not found"
  end

  private

  def set_country
    @country = Country.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    redirect_to admin_configurations_countries_path, alert: "Country not found"
  end

  def country_params
    params.permit(:name, :code, :description, :picture)
  end
end
