ALTER TABLE `suppliers_categories` DROP FOREIGN KEY `suppliers_categories_fk1`; ALTER TABLE `suppliers_categories` ADD CONSTRAINT `suppliers_categories_fk1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier`(`id`) ON DELETE CASCADE ON UPDATE CASCADE; ALTER TABLE `suppliers_categories` DROP FOREIGN KEY `suppliers_categories_fk2`; ALTER TABLE `suppliers_categories` ADD CONSTRAINT `suppliers_categories_fk2` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `supplier_product` DROP FOREIGN KEY `supplier_product_fk1`; ALTER TABLE `supplier_product` ADD CONSTRAINT `supplier_product_fk1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `bid` DROP FOREIGN KEY `bid_fk1`; ALTER TABLE `bid` ADD CONSTRAINT `bid_fk1` FOREIGN KEY (`tender_id`) REFERENCES `tender`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `tender` ADD INDEX(`supplier_id`);

ALTER TABLE `tenders_categories` DROP FOREIGN KEY `category_id_fk2`; ALTER TABLE `tenders_categories` ADD CONSTRAINT `category_id_fk2` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE; ALTER TABLE `tenders_categories` DROP FOREIGN KEY `tender_id_fk1`; ALTER TABLE `tenders_categories` ADD CONSTRAINT `tender_id_fk1` FOREIGN KEY (`tender_id`) REFERENCES `tender`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `tender` ADD CONSTRAINT `tender_fk7` FOREIGN KEY (`supplier_id`) REFERENCES `supplier`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

