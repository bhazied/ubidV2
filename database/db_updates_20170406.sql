ALTER TABLE `category` ADD `tenders_description` TEXT NULL AFTER `meta_keywords` ;
ALTER TABLE `category` ADD `consultations_description` TEXT NULL AFTER `tenders_meta_keywords` ;
ALTER TABLE `category` ADD `buyers_description` TEXT NULL AFTER `consultations_meta_keywords` ;
ALTER TABLE `category` ADD `suppliers_description` TEXT NULL AFTER `buyers_meta_keywords` ;
