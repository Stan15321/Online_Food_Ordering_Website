<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="Users.aspx.cs" Inherits="Food.Admin.Users" %>
<%@ Import Namespace="Food" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <script>
        window.onload = function () {
            var seconds = 5;
            setTimeout(function () {
                document.getElementById("<%=lblMsg.ClientID%>").style.display = "none";
            }, seconds * 1000);

        };
    </script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="pcoded-inner-content pt-0">
        <div class="align-align-self-end">
            <asp:Label ID="lblMsg" runat="server" Visible="false"></asp:Label>
        </div>

        <div class="main-body">
            <div class="page-wrapper">
                <div class="page-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="card">
                                <div class="card-header">
                                    </div>
                                <div class="card-block">
                                    <div class="row">

                                        

                                         <div class="col-12 mobile-inputs">
                                            <h4 class="sub-title">Category Lists</h4>
                                             <div class="card-block table-border-style">
                                                 <div class="table-responsive">

                                                     <asp:Repeater ID="rUsers" runat="server" OnItemCommand="rUsers_ItemCommand">
                                                         <HeaderTemplate>
                                                             <table class="table data-table-export table-hover nowrap">
                                                                 <thead>
                                                                 <tr>
                                                                     <th class="table-plus">SrNo</th>
                                                                     <th>Full Name</th>
                                                                     <th>Username</th>
                                                                     <th>Email</th>
                                                                     <th>Joined Date</th>
                                                                     <th class="datatable-nosort">Delete</th>
                                                                 </tr>
                                                             </thead>
                                                                 <tbody>
                                                         </HeaderTemplate>
                                                         <ItemTemplate>
                                                             <tr>
                                                                 <td class="table-plus"><%#Eval("SrNo") %></td>
                                                                 <td><%#Eval("Name") %></td>
                                                                 <td><%#Eval("Username") %></td>
                                                                 <td><%#Eval("Email") %></td>
                                                                 <td><%#Eval("CreatedDate") %></td>
                                                                 <td>
                                                                     <asp:LinkButton ID="lnkDelete" Text="Delete" runat="server" CommandName="delete"
                                                                         CssClass="badge bg-danger" CommandArgument='<%# Eval("UserId") %>'
                                                                         OnClientClick="return confirm('Do you want to delete this user?');">
                                                                         <i class="ti-trash"></i>
                                                                     </asp:LinkButton>
                                                                 </td>
                                                             </tr>
                                                         </ItemTemplate>
                                                         <FooterTemplate>
                                                             </tbody>
                                                             </table>
                                                         </FooterTemplate>
                                                     </asp:Repeater>

                                                 </div>
                                             </div>

                                         </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
