CREATE PROCEDURE [dbo].[User_Crud]
@Action VARCHAR(20),
@UserId INT = NULL,
@Name VARCHAR(50) = NULL,
@Username VARCHAR(50) = NULL,
@Mobile VARCHAR(50) = NULL,
@Email VARCHAR(50) = NULL,
@Address VARCHAR(MAX) = NULL,
@PostCode VARCHAR(50) = NULL,
@Password VARCHAR(50) = NULL,
@ImageUrl VARCHAR(MAX) = NULL

AS
BEGIN
SET NOCOUNT ON;

IF @Action = 'SELECT4LOGIN'
BEGIN
SELECT * FROM dbo.Users WHERE Username = @Username and Password = @Password
END

IF @Action = 'SELECT4PROFILE'
BEGIN
SELECT * FROM dbo.Users WHERE UserId = @UserId
END

IF @Action = 'INSERT'
BEGIN
Insert into dbo.Users(Name, Username, Mobile, Email, Address, PostCode, Password, ImageUrl, CreatedDate)
VALUES(@Name, @Username, @Mobile, @Email, @Address, @PostCode, @Password, @ImageUrl, GETDATE())
END

IF @Action = 'UPDATE'
BEGIN
DECLARE @UPDATE_IMAGE VARCHAR(20)
SELECT @UPDATE_IMAGE = (CASE WHEN @ImageUrl IS NULL THEN 'NO' ELSE 'YES' END)

IF @UPDATE_IMAGE = 'NO'
BEGIN
UPDATE dbo.Users
SET Name = @Name, Username = @Username, Mobile = @Mobile, Email = @Email, Address = @Address,
PostCode = @PostCode
WHERE UserId = @UserId
END
ELSE
BEGIN
UPDATE dbo.Users
SET Name = @Name, Username= @Username, Mobile= @Mobile, Email = @Email, Address = @Address, 
PostCode = @PostCode, ImageUrl =@ImageUrl
WHERE UserId = @UserId
END
END

IF @Action = 'SELECT4ADMIN'
BEGIN
SELECT ROW_NUMBER() OVER(ORDER BY (SELECT 1)) AS [SrNo], UserId, Name, 
Username, Email, CreatedDate
FROM Users
END

IF @Action = 'DELETE'
BEGIN
DELETE FROM dbo.Users WHERE UserId = @UserId
END
END
GO