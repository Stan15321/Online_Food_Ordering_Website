Create database Food

USE Food


CREATE TABLE [Users](
[UserId] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
[Name] [varchar](50) NULL,
[Username] [varchar](50) NULL UNIQUE,
[Mobile] [varchar](50) NULL,
[Email] [varchar](50) NULL UNIQUE,
[Address] [varchar](max) NULL,
[PostCode] [varchar](50) NULL,
[Password] [varchar](50) NULL,
[ImageUrl] [varchar](max) NULL,
[CreatedDate] [dateTime] NULL
)

CREATE TABLE [Contact](
[ContactId] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
[Name] [varchar](50) NULL,
[Email] [varchar](50) NULL,
[Subject] [varchar](200) NULL,
[Message] [varchar](max) NULL,
[CreateDate] [dateTime] NULL
)

CREATE TABLE [Categories](
[CategoryId] [int]  PRIMARY KEY IDENTITY(1,1) NOT NULL,
[Name] [varchar](50) NULL,
[ImageUrl][varchar](max) NULL,
[IsActive] [bit] NULL,
[CreatedDate] [dateTime] NULL
)

CREATE TABLE [Products](
[ProductId] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
[Name] [varchar](50) NULL,
[Description] [varchar](max) NULL,
[Price] [decimal](18, 2) NULL,
[Quantity] [int] NULL,
[ImageUrl] [varchar] (max) NULL,
[CategoryId] [int] NULL, --ForeignKey
[IsActive] [bit] NULL,
[CreatedDate] [dateTime] NULL
)

CREATE TABLE [Carts](
[CartId] [int] PRIMARY KEY IDENTITY NOT NULL,
[ProductId] [int] NULL, --Foreign Key
[Quantity] [int] NULL,
[UserId] [int] NULL --Foreign Key
)

CREATE TABLE[Orders](
[OrderDetailsId] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
[OrderNo] [varchar](max) NULL,
[ProductId] [int] NULL, --FK
[Quantity] [int] NULL,
[UserId] [int] NULL, --FK
[Status] [varchar](50) NULL,
[PaymentId] [int] NULL, --FK
[OrderDate] [dateTime] NULL
)

CREATE TABLE[Payment](
[PaymentId] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
[Name] [varchar](50) NULL,
[CardNo] [varchar](50) NULL,
[ExpiryDate] [varchar](50) NULL,
[CvvNo] [int] NULL,
[Address] [varchar](50) NULL,
[PaymentMode] [varchar](50) NULL
)