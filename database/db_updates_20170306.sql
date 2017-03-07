
ALTER TABLE  `category` ADD  `tenders_meta_title` TINYTEXT NULL AFTER  `meta_keywords` ,
ADD  `tenders_meta_description` TINYTEXT NULL AFTER  `tenders_meta_title` ,
ADD  `tenders_meta_keywords` TINYTEXT NULL AFTER  `tenders_meta_description` ,
ADD  `consultations_meta_title` TINYTEXT NULL AFTER  `tenders_meta_keywords` ,
ADD  `consultations_meta_description` TINYTEXT NULL AFTER  `consultations_meta_title` ,
ADD  `consultations_meta_keywords` TINYTEXT NULL AFTER  `consultations_meta_description` ,
ADD  `buyers_meta_title` TINYTEXT NULL AFTER  `consultations_meta_keywords` ,
ADD  `buyers_meta_description` TINYTEXT NULL AFTER  `buyers_meta_title` ,
ADD  `buyers_meta_keywords` TINYTEXT NULL AFTER  `buyers_meta_description` ,
ADD  `suppliers_meta_title` TINYTEXT NULL AFTER  `buyers_meta_keywords` ,
ADD  `suppliers_meta_description` TINYTEXT NULL AFTER  `suppliers_meta_title` ,
ADD  `suppliers_meta_keywords` TINYTEXT NULL AFTER  `suppliers_meta_description` ;
