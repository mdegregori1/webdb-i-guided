select CustomerName, Address from Customers

-- filter the rows
select CustomerName, CustomerID, Country, City 
from Customers
where country = 'Germany'

-- sorting
select CustomerName, CustomerID, Country, City 
from Customers
order by country, city

-- designing by country and ascending by city
select CustomerName, CustomerID, Country, City 
from Customers
order by country desc, city

-- controlling how many records to return 

select * 
from products
limit 5

-- pagination with order by, limit, and offset
select * from products
order by price desc
limit 5
offset 10 

-- adding records

insert into products (productName, supplierID, categoryID, unit, price)
values('cake', 7, 1, 'one', 20.99)

-- partial lookup

select * from Products
where productName like 
'%cake%'

%=idc what is here

-- updating records 
update products 
set price = 24.99
where productId= 79

-- delete 

delete from products 
where ProductID = 80