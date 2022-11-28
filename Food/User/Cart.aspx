<%@ Page Title="" Language="C#" MasterPageFile="~/User/User.Master" AutoEventWireup="true" CodeBehind="Cart.aspx.cs" Inherits="Food.User.Cart" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">

    <section class="book_section layout_padding">
        <div class="container">
            <div class="heading_container">
                <div class="align-self-end">
                    <asp:Label ID="lblMsg" runat="server" Visible="false"></asp:Label>
                </div>
                   <h2>Your Shopping Cart</h2>
            </div>
        </div>
        <div class="container">
            <asp:Repeater ID="rCartItem" runat="server" onItemCommand="rCartItem_ItemCommand" onItemDataBound="rCartItem_ItemDataBound">
                <HeaderTemplate>
                    <table>

                    </table>
                </HeaderTemplate>
            </asp:Repeater>
        </div>
    </section>


</asp:Content>
