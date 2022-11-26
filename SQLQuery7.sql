CREATE PROCEDURE Cart_Crud
@Action VARCHAR(10),
@ProductId INT = NULL,
@Qantity INT = NULL,
@UserId INT = NULL
AS
BEGIN
SET NOCOUNT ON;

--SELECT--
IF @Action = 'SELECT'
BEGIN
SELECT c.ProductId,p.Name,p.ImageUrl,p.Price,c.Quantity AS Qty,p.Quantity AS PrdQty 
FROM dbo.Carts c
INNER JOIN dbo.Products p ON p.ProductId = c.ProductId
WHERE c.UserId = @UserId
END

--INSERT--
IF @Action = 'INSERT'
BEGIN
INSERT INTO dbo.Carts(ProductId,Quantity,UserId)
VALUES(@ProductId,@Qantity,@UserId)
END

--UPDATE--
IF @Action = 'UPDATE'
BEGIN
UPDATE dbo.Carts 
SET Quantity = @Qantity
WHERE ProductId = @ProductId AND UserId = @UserId
END

--DELETE--
IF @Action = 'DELETE'
BEGIN
DELETE FROM dbo.Carts 
WHERE ProductId = @ProductId AND UserId = @UserId
END

--GETBYID(PRODUCTID)
IF @Action = 'GETBYID'
BEGIN
SELECT * FROM dbo.Carts

WHERE ProductId = @ProductId AND UserId = @UserId
END

END