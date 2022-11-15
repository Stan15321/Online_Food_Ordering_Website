<%@ Page Title="" Language="C#" MasterPageFile="~/User/User.Master" AutoEventWireup="true" CodeBehind="Profile.aspx.cs" Inherits="Food.User.Profile" %>
<%@ Import Namespace="Food" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">

    <%
        string imageUrl = Session["imageUrl"].ToString();
    %>

    <section class="book_section layout_padding">
        <div class="container">
            <div class="heading_container">
                <h2>User Information</h2>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-accordian-title mb-4">
                            <div class="d-flex justify-content-start">
                                <div class="image-container">
                                    <img src="<%= Utils.GetImageUrl(imageUrl); %>" id="imgProfile" style="width:150px; height:150px;"
                                        class="img-thumbnail" />
                                    <div class="middle pt-2">
                                        <a href="Registration.aspx?id=<%Response.Write(Session["userId"]);%>" class="btn btn-warning">
                                            <i class="fa fa-pencil"></i>Edit Details
                                        </a>
                                    </div>
                                </div>

                                <div class="userData ml-3">
                                    <h2 class="d-block" style="font-size: 1.5rem; font-weight: bold">
                                        <a href="javascript:void(0);"><%Response.Write(Session["name"]); %></a>
                                    </h2>
                                    <h6 class="d-block">
                                        <a href="javascript:void(0);">
                                            <asp:Label ID="lblUsername" runat="server" ToolTip="Unique Username">
                                                @<%Response.Write(Session["username"]); %>
                                            </asp:Label>
                                        </a>
                                    </h6>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>


</asp:Content>
