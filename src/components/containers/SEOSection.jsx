import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localizedSEOContent } from "@/data/seo-content-locales";

const SEO_CONTENT = {
  general: {
    label: "Buying Guide",
    markdown: `## Shipping Containers for Sale in the Netherlands

STF Container B.V. supplies a wide range of new and used shipping containers throughout the Netherlands. Whether you need a container for transport, on-site storage, or a custom conversion project, we have the right solution for your needs.

All our containers are wind and water tight, cargo worthy, and inspected before delivery. We offer competitive pricing, fast delivery across the country, and flexible options for both businesses and individuals.

Browse our full inventory above to find the right container type, size, and condition for your project. Need help choosing? Contact our team for expert advice and a personalised quote.`,
  },
  // Category-based content
  Standard: {
    label: "Category Guide",
    markdown: `# Standard Shipping Containers

## Buy Standard Shipping Containers

A **standard shipping container** is the most popular and versatile container available for storage, transport and conversion projects. Designed to international ISO standards and manufactured from durable corten steel, these containers are built to withstand demanding weather conditions while providing secure, long-lasting protection for your goods.

Standard shipping containers are widely used across industries including construction, logistics, agriculture, manufacturing and retail. They are also a popular choice for private customers looking for secure outdoor storage. Available in a range of sizes, they offer a practical solution for storing tools, machinery, furniture, stock and equipment.

Whether you are purchasing your first container or expanding your fleet, a standard shipping container provides excellent value thanks to its strength, versatility and long service life.

## Why Choose a Standard Shipping Container?

A standard shipping container is designed to meet a wide variety of storage and transport needs. Its robust steel construction, weather-resistant design and secure locking system make it one of the safest and most reliable storage solutions available.

Choosing a standard container offers several advantages:

* Secure and weatherproof storage
* Suitable for transport and storage
* Built to international ISO standards
* Long service life with minimal maintenance
* Available in multiple sizes
* Easy to transport and relocate
* Ideal for commercial and private use

Because of their flexibility, standard shipping containers remain the preferred choice for businesses and individuals around the world.

## Common Applications

Standard shipping containers are used across almost every industry because they provide secure and flexible storage wherever it is needed.

Typical applications include:

* Construction site storage
* Warehouse overflow
* Agricultural equipment storage
* Manufacturing facilities
* Retail inventory storage
* Furniture and household storage
* Workshop storage
* Import and export shipping
* Container conversion projects

Their versatility makes them suitable for both temporary and permanent storage solutions.`,
    markdown_collapse: `## Available Container Sizes

Standard shipping containers are available in several sizes to suit different storage and transport requirements.

### 10ft Shipping Containers

A **10ft shipping container** is ideal when space is limited but secure storage is still required. Its compact footprint makes it perfect for smaller sites, residential properties and businesses with limited available space.

### 20ft Shipping Containers

The **20ft shipping container** is the most popular size worldwide. It provides an excellent balance between storage capacity, transportability and affordability, making it suitable for most commercial and private applications.

### 40ft Shipping Containers

A **40ft shipping container** offers maximum storage capacity and is ideal for businesses storing large quantities of goods, machinery or palletised inventory. It provides almost twice the internal volume of a 20ft container.

## New or Used Standard Shipping Containers?

Customers can choose between **new one-trip containers** and **used shipping containers**, depending on their budget and intended application.

A **new container** is ideal for customers seeking maximum durability, excellent appearance and the longest possible service life. These containers have generally completed only one international shipment before being offered for sale.

A **used container** provides a more affordable alternative while remaining structurally sound, weather-resistant and suitable for a wide variety of storage applications. For many businesses, a quality used container delivers outstanding value without compromising on security or performance.

## Standard vs Specialist Containers

While a standard shipping container is suitable for most storage and transport applications, some projects require more specialised solutions.

If you regularly load oversized equipment or palletised goods, an **Open Side Shipping Container** provides full-length side access for faster loading and unloading.

For businesses storing food, pharmaceuticals or other temperature-sensitive products, a **Refrigerated Container** offers reliable climate-controlled storage.

If you require a ready-to-use workspace, an **Office Container** provides a practical alternative to traditional buildings.

Choosing the right container depends on what you intend to store and how you plan to use it.

## Delivery Throughout the Netherlands

All standard shipping containers can be delivered directly to your location using specialist transport. Before delivery, it is important to ensure there is sufficient access for the delivery vehicle and a stable surface for container placement.

If required, our team can help determine the most suitable delivery method and advise on positioning the container safely and efficiently.

## Which Standard Container Should You Choose?

Choosing the right size depends on your available space and storage requirements.

A **10ft container** is ideal for compact storage.

A **20ft container** is the best all-round solution and remains the most popular choice for businesses and homeowners.

A **40ft container** offers the highest storage capacity and is recommended when maximum internal volume is required.

Comparing the available sizes before purchasing ensures you select the most suitable container for your project.

## Related Container Solutions

You may also be interested in:

* **10ft Shipping Containers**
* **20ft Shipping Containers**
* **40ft Shipping Containers**
* **Open Side Shipping Containers**
* **Refrigerated Containers**
* **Office Containers**
* **Storage Containers**
* **New Containers for Sale**
* **Buy Used Containers**

## Frequently Asked Questions

### What is a standard shipping container?

A standard shipping container is an ISO-certified steel container designed for secure storage and international transport. It is the most common container type used worldwide.

### Which size standard container should I choose?

The right size depends on your storage requirements. A 10ft container is suitable for compact spaces, a 20ft container is the most versatile option, while a 40ft container provides maximum storage capacity.

### Can I buy a new or used standard shipping container?

Yes. Standard containers are available as both new one-trip containers and quality used containers, allowing you to choose the option that best suits your budget.

### Are standard shipping containers weatherproof?

Yes. Standard shipping containers are built to protect their contents from rain, wind and harsh weather conditions, making them suitable for long-term outdoor use.

### Can standard shipping containers be converted?

Absolutely. Standard containers are commonly converted into offices, workshops, storage units, retail spaces and many other modular buildings due to their strong steel construction and durable design.`,
  },
  "High Cube": {
    label: "Category Guide",
    markdown: `## High Cube Shipping Containers for Sale

High Cube containers offer an extra foot of height compared to standard containers, making them ideal for storing or transporting tall cargo, as well as for conversion projects that require more headroom.

Available in 40ft and 45ft lengths, High Cube containers are popular for container homes, offices, and workshops where ceiling height matters. The additional vertical space also improves ventilation and comfort for habitable conversions.

All our High Cube containers are structurally sound, wind and water tight, and ready for immediate deployment. Contact us to discuss your requirements and get a competitive quote.`,
  },
  "Open Side": {
    label: "Category Guide",
    markdown: `# Open Side Shipping Containers

## Buy Open Side Shipping Containers

An **Open Side Shipping Container** is the perfect solution when easy access to your cargo is just as important as secure storage. Unlike a standard shipping container, an Open Side container features full-length side-opening doors, allowing you to load and unload goods quickly from the side as well as through the end doors.

This design makes Open Side containers particularly popular for businesses handling oversized equipment, palletised goods, construction materials and machinery. Whether you need additional storage, temporary workspace or a container for transporting bulky cargo, an Open Side container offers greater flexibility while maintaining the strength and durability of a standard ISO shipping container.

Available in both **20ft** and **40ft** sizes, Open Side containers are suitable for commercial, industrial and private applications where convenient access is essential.

## Why Choose an Open Side Shipping Container?

The biggest advantage of an Open Side container is accessibility. Instead of moving goods through a single set of end doors, the full-length side opening allows forklifts, pallet trucks and personnel to load or unload items much more efficiently.

Benefits of an Open Side container include:

* Full side access for faster loading and unloading
* Ideal for oversized or bulky cargo
* Easy access to stored goods
* Durable corten steel construction
* Weatherproof and secure
* Suitable for transport and storage
* Available in new and used condition

For businesses that frequently access stored inventory, an Open Side container can significantly improve productivity.

## Common Applications

Open Side containers are used across many industries where flexibility and accessibility are important.

They are commonly used for:

* Construction site storage
* Warehouse and logistics operations
* Machinery and equipment storage
* Retail stock storage
* Event equipment and exhibition materials
* Building materials
* Agricultural machinery
* Furniture storage
* Container conversion projects
* Pop-up retail and exhibition spaces

The wide side opening also makes these containers an excellent choice for projects requiring frequent loading and unloading.`,
    markdown_collapse: `## Available Sizes

Open Side shipping containers are available in two of the industry's most popular sizes.

### 20ft Open Side Container

A **20ft Open Side Container** provides the perfect balance between storage capacity and accessibility. It is ideal for businesses requiring convenient side access while maintaining a manageable footprint.

### 40ft Open Side Container

A **40ft Open Side Container** offers maximum storage capacity combined with unrestricted side access. It is particularly suitable for storing large machinery, palletised goods and oversized equipment that would be difficult to load through conventional container doors.

Not sure which size is right for your project? Compare our **20ft Shipping Containers** and **40ft Shipping Containers** to find the best solution.

## Open Side vs Standard Shipping Container

A standard shipping container is the best choice for general storage and international transport, offering secure end-door access for a wide range of applications.

An Open Side container is designed for customers who require easier loading and greater flexibility. The full-length side opening allows direct access to almost the entire interior, making it much easier to organise, retrieve and load goods.

If you regularly handle large or awkward items, an Open Side container can save valuable time while improving workplace efficiency.

## New or Used Open Side Containers?

Open Side containers are available in both **new** and **used** condition.

A **new one-trip Open Side container** is ideal for customers seeking maximum service life, excellent appearance and minimal wear. These containers have completed only one international journey before being offered for sale.

A **used Open Side container** provides a more cost-effective option while maintaining the structural integrity and weather resistance required for secure storage. Each container should be inspected to ensure the doors, locking mechanisms and seals remain in excellent working condition.

## Delivery and Installation

Our Open Side containers can be delivered directly to your location using specialist transport equipment.

Before delivery, it is important to ensure there is sufficient space not only for the container itself but also for the side doors to open fully. A level, stable surface and adequate site access will help ensure a smooth delivery and installation.

If you are unsure which delivery option is best for your site, our team will be happy to advise.

## Is an Open Side Container Right for You?

Choosing the right container depends on how you plan to use it.

If you simply require secure storage for tools, equipment or inventory, a **Standard Shipping Container** may be the most economical option.

However, if your business frequently loads pallets, machinery or oversized materials, an **Open Side Shipping Container** offers far greater convenience and efficiency thanks to its full side access.

For businesses handling temperature-sensitive products, a **Refrigerated Container** may be the better choice, while customers looking for mobile workspace should consider an **Office Container**.

## Related Container Solutions

Depending on your project, you may also be interested in:

* **Standard Shipping Containers**
* **20ft Shipping Containers**
* **40ft Shipping Containers**
* **Storage Containers**
* **Refrigerated Containers**
* **Office Containers**
* **New Containers for Sale**
* **Buy Used Containers**

## Frequently Asked Questions

### What is an Open Side shipping container?

An Open Side shipping container is a container with full-length side-opening doors in addition to the standard end doors. This provides much easier access for loading and unloading bulky or palletised goods.

### What are Open Side containers used for?

Open Side containers are commonly used for construction materials, machinery, warehouse storage, event equipment, retail stock, agricultural equipment and container conversion projects.

### Are Open Side containers available in different sizes?

Yes. Open Side containers are commonly available in both 20ft and 40ft sizes, allowing customers to choose the most suitable option for their storage requirements.

### Can I buy a new or used Open Side container?

Yes. We offer both new one-trip and quality used Open Side containers, giving customers the flexibility to choose the option that best suits their budget.

### Are Open Side containers weatherproof?

Yes. Like standard shipping containers, Open Side containers are built from durable corten steel and designed to provide secure, weather-resistant protection for your goods.

### Is an Open Side container better than a standard container?

That depends on your application. If you regularly load oversized items or require quick access to stored goods, an Open Side container is often the better choice. For general storage and shipping, a standard shipping container remains the most versatile option.`,
  },
  Office: {
    label: "Category Guide",
    markdown: `# Office Containers

## Buy Office Containers for Flexible Workspace Solutions

An **office container** is a practical and cost-effective solution when you need additional workspace quickly and without the delays associated with traditional construction. Designed as modular workspaces, office containers provide a comfortable and functional environment for employees, site managers, project teams and businesses that require flexible office space.

Office containers are widely used on construction sites, industrial locations, warehouses, events and temporary projects where permanent buildings are not suitable or cannot be completed within the required timeframe.

Modern office containers can be customised with insulation, electrical installations, lighting, heating, air conditioning, windows and doors to create a comfortable working environment throughout the year. Whether you need a temporary site office or a long-term modular workspace, an office container offers flexibility, mobility and excellent value.

## Why Choose an Office Container?

Businesses choose office containers because they provide a fast and efficient way to create professional workspace without major construction costs. Unlike traditional buildings, office containers can be delivered, installed and ready for use within a short timeframe.

The main advantages of office containers include:

* Fast installation compared to traditional construction
* Lower investment costs
* Flexible and relocatable workspace
* Customisable interior layouts
* Suitable for temporary or permanent use
* Available with insulation and climate control
* Easy expansion by connecting multiple units

For companies managing changing projects, growing teams or temporary locations, office containers provide a reliable workspace solution that can adapt to different needs.

## Common Applications for Office Containers

Office containers are used across many industries where flexible workspace is required.

### Construction Site Offices

One of the most common uses is as a temporary construction site office. Project managers, engineers and contractors can have a dedicated workspace directly at the construction location.

### Industrial and Business Facilities

Companies use office containers to create additional offices, meeting rooms, reception areas or staff facilities without expanding existing buildings.

### Warehouses and Logistics

Office containers are often placed inside warehouses or distribution centres to provide management offices, administration areas or security points.

### Events and Temporary Projects

For festivals, exhibitions and temporary events, office containers provide secure and comfortable working areas that can be removed after the project ends.

### Modular Office Buildings

Multiple office containers can be combined to create larger modular office complexes with multiple rooms, corridors and facilities.`,
    markdown_collapse: `## Office Container Features and Options

Modern office containers can be configured according to your specific requirements. Depending on the model, they can include:

* Thermal insulation
* Electrical installation
* Lighting systems
* Heating and cooling options
* Windows and external doors
* Flooring solutions
* Partition walls
* Data and communication connections
* Sanitary facilities

These options allow office containers to provide the same basic functionality as traditional office spaces while maintaining the flexibility of a modular structure.

## Office Container Sizes

Office containers are available in different sizes depending on your workspace requirements.

### 10ft Office Containers

A **10ft office container** is a compact solution for smaller teams, security offices, site supervision or locations where space is limited.

### 20ft Office Containers

A **20ft office container** is the most common choice for businesses. It provides enough space for workstations, meeting areas and administrative activities while remaining easy to transport and install.

### 40ft Office Containers

A **40ft office container** offers maximum workspace and is suitable for larger teams, project offices and companies requiring multiple workstations.

If you require a different layout, multiple office containers can also be combined to create larger modular buildings.

## New or Used Office Containers?

When purchasing an office container, customers can choose between new and used options depending on their requirements and budget.

### New Office Containers

A new office container offers the latest design, excellent condition and maximum service life. It is the ideal choice for businesses looking for a professional workspace solution with modern finishes.

### Used Office Containers

A used office container provides a more affordable alternative while still offering practical workspace functionality. Quality used units can be an excellent option for temporary projects, additional storage offices or businesses with budget considerations.

Before purchasing a used office container, it is important to check the condition of insulation, electrical systems, doors and windows.

## Office Containers vs Traditional Buildings

Office containers provide several advantages compared to traditional construction.

Traditional office buildings often require:

* Long construction periods
* Higher investment costs
* Fixed locations
* Complex planning processes

Office containers offer:

* Faster installation
* Lower costs
* Relocation possibilities
* Flexible expansion options
* Minimal disruption to operations

For businesses requiring fast workspace solutions, office containers are often the more practical choice.

## Delivery and Installation

Office containers can be delivered directly to your location using specialist transport equipment. Before installation, the site should have a stable and level foundation to ensure the container remains secure and functional.

Depending on the size and configuration, office containers can often be installed quickly after delivery.

If you are planning a larger office project, multiple units can be connected to create customised modular office buildings.

## Office Container or Storage Container?

Choosing between an office container and a storage container depends on how you intend to use the space.

A **storage container** is designed primarily for secure storage of equipment, materials and goods.

An **office container** is designed as a usable workspace with features such as insulation, electricity, lighting and heating.

If you need a place for employees to work, manage projects or meet clients, an office container is the better solution.

## Related Container Solutions

Depending on your project, you may also be interested in:

* **Storage Containers**
* **Standard Shipping Containers**
* **20ft Shipping Containers**
* **40ft Shipping Containers**
* **New Containers for Sale**
* **Buy Used Containers**
* **Open Side Containers**

## Frequently Asked Questions

### What is an office container used for?

Office containers are used as temporary or permanent workspaces for construction sites, businesses, warehouses, industrial locations and events.

### How much does an office container cost?

The price depends on the size, specifications, insulation, interior finish and additional features required. A basic office container will generally cost less than a fully equipped modular office unit.

### Can office containers be used throughout the year?

Yes. Office containers with proper insulation, heating and ventilation can be used comfortably throughout all seasons.

### Do office containers require planning permission?

Requirements vary depending on location, intended use and local regulations. It is recommended to check local building requirements before installation.

### Can office containers be connected together?

Yes. Multiple office containers can be combined to create larger workspaces, meeting rooms or complete modular office buildings.

### Can an office container be moved?

Yes. One of the main advantages of office containers is their flexibility. They can be transported and relocated when project requirements change.`,
  },
  Storage: {
    label: "Category Guide",
    markdown: `# Storage Containers

## Buy Storage Containers for Secure and Flexible Storage

A **storage container** is one of the most practical solutions when you need additional secure storage space for equipment, materials, inventory or personal belongings. Built from durable corten steel and designed to withstand demanding outdoor conditions, storage containers provide a reliable alternative to traditional storage buildings and warehouses.

Whether you need temporary storage during a construction project, additional space for your business or a long-term solution for tools and equipment, a storage container offers flexibility, security and excellent value.

Available in multiple sizes, including **10ft, 20ft and 40ft containers**, storage containers can be delivered directly to your location and positioned wherever additional space is required. They are widely used by construction companies, manufacturers, farmers, retailers and private customers throughout Europe.

## Why Choose a Storage Container?

Storage containers are popular because they combine durability, security and flexibility in one simple solution. Unlike temporary storage structures, a steel container provides a strong, lockable and weather-resistant space that can be used for many years.

The main advantages of storage containers include:

* Secure protection against theft and unauthorised access
* Weatherproof storage for outdoor use
* Strong steel construction
* Low maintenance requirements
* Easy relocation when requirements change
* Available in different sizes
* Suitable for commercial and private use

For businesses, storage containers provide a fast way to increase available storage capacity without the cost and delays associated with permanent construction.

## Common Uses for Storage Containers

Storage containers are used across many industries because they can be adapted to different requirements.

Common applications include:

### Construction Site Storage

Construction companies often use storage containers for storing tools, machinery, building materials and equipment securely on-site. Their robust construction makes them ideal for demanding environments.

### Business and Warehouse Storage

Companies use storage containers as additional warehouse space for inventory, documents, spare parts and seasonal stock.

### Agricultural Storage

Farmers use containers to store machinery, feed supplies, tools and agricultural equipment while protecting them from weather conditions.

### Private Storage

Homeowners use storage containers for furniture storage, garden equipment, bicycles, vehicles and household belongings.

### Workshop and Conversion Projects

Because of their strong structure, storage containers can also be converted into workshops, garages, offices and customised spaces.`,
    markdown_collapse: `## Storage Container Sizes

Choosing the right size depends on the amount of storage space you require and the available area at your location.

### 10ft Storage Containers

A **10ft storage container** is ideal when space is limited. Its compact size makes it suitable for residential properties, small businesses and construction sites where a larger container may not fit.

### 20ft Storage Containers

A **20ft storage container** is the most popular choice for general storage. It provides an excellent balance between capacity, affordability and ease of placement.

### 40ft Storage Containers

A **40ft storage container** offers maximum storage capacity and is suitable for businesses requiring larger volumes of space for equipment, inventory or materials.

If you are unsure which size is best, compare our **10ft Containers**, **20ft Containers** and **40ft Containers** to find the right solution.

## New or Used Storage Containers?

Storage containers are available in both **new** and **used** condition, allowing customers to choose according to their budget and requirements.

### New Storage Containers

New containers, often known as one-trip containers, offer excellent condition, minimal wear and the longest possible service life. They are ideal when appearance and long-term reliability are important.

### Used Storage Containers

Used containers provide an affordable alternative while still offering strong protection against weather and theft. A quality used container remains a reliable storage solution for businesses, farms and private users.

For many storage applications, purchasing a used container provides excellent value without compromising functionality.

## Storage Containers vs Traditional Storage Buildings

Many businesses choose storage containers because they offer several advantages compared to permanent storage solutions.

A traditional building project often requires planning, construction time and significant investment. A storage container can usually be delivered and installed much faster, providing immediate additional space.

Storage containers are also portable, meaning they can be relocated if your business, project or storage requirements change.

For temporary projects or expanding businesses, this flexibility makes containers an attractive alternative to permanent storage facilities.

## Delivery and Placement

Storage containers can be delivered directly to your site using specialised transport equipment. Before delivery, it is important to ensure there is enough access space for the delivery vehicle and a suitable surface for container placement.

A level and stable foundation helps keep the container secure and ensures smooth operation of the doors.

If you need advice about delivery requirements or the best position for your container, our team can help you find the right solution.

## Storage Containers for Business and Private Use

Whether you are a business owner looking for additional warehouse capacity or a homeowner needing extra space, storage containers provide a flexible and secure option.

Businesses benefit from:

* Fast additional storage capacity
* Protection for valuable equipment and inventory
* Flexible placement options
* Lower investment compared to permanent buildings

Private customers benefit from:

* Secure outdoor storage
* Protection against weather
* Space for household items and equipment
* Long-term usability

## Related Container Solutions

Depending on your requirements, you may also be interested in:

* **10ft Shipping Containers**
* **20ft Shipping Containers**
* **40ft Shipping Containers**
* **Standard Shipping Containers**
* **Open Side Containers**
* **Office Containers**
* **Refrigerated Containers**
* **New Containers for Sale**
* **Buy Used Containers**

## Frequently Asked Questions

### What is a storage container used for?

Storage containers are used for storing tools, equipment, machinery, inventory, furniture and many other goods. They are suitable for construction sites, businesses, farms and private properties.

### Are storage containers waterproof?

Quality storage containers are designed to be weather-resistant and provide protection against rain, wind and moisture. Proper maintenance and correct placement help ensure long-term performance.

### What size storage container should I choose?

A 10ft container is suitable for smaller storage needs, a 20ft container is the most versatile option, and a 40ft container is recommended when maximum storage capacity is required.

### Can storage containers be delivered to my location?

Yes. Storage containers can be delivered directly to your site using specialist transport equipment. Access requirements should be checked before delivery.

### Should I buy a new or used storage container?

A new container provides maximum lifespan and the best appearance, while a used container offers a more affordable solution while still providing secure and durable storage.

### Can a storage container be modified?

Yes. Storage containers can be customised with doors, windows, insulation, electricity and other modifications to create workshops, offices or specialised storage spaces.`,
  },
  Refrigerated: {
    label: "Category Guide",
    markdown: `# Refrigerated Containers

## Buy Refrigerated Containers for Temperature-Controlled Storage

A **refrigerated container**, also known as a reefer container, is a specialised shipping container designed to maintain precise temperature control for storing and transporting perishable goods. Equipped with an integrated cooling unit, refrigerated containers provide a reliable cold chain solution for businesses handling food, pharmaceuticals, flowers and other temperature-sensitive products.

Refrigerated containers are widely used across the food industry, agriculture, pharmaceuticals, catering and logistics. They offer a flexible alternative to permanent cold storage facilities, allowing businesses to scale their cold storage capacity as needed.

Whether you need temporary cold storage during peak seasons, a permanent solution for your facility or a transport-ready unit for perishable cargo, a refrigerated container provides dependable temperature control, secure storage and excellent value.

## Why Choose a Refrigerated Container?

Refrigerated containers are chosen because they offer precise, reliable temperature control in a portable and durable format. Unlike fixed cold storage rooms, reefer containers can be delivered, positioned and relocated as your needs change.

The main advantages of refrigerated containers include:

* Precise temperature control from -25°C to +25°C
* Suitable for frozen and chilled goods
* Portable and relocatable cold storage
* Built to ISO shipping container standards
* Durable corten steel construction
* Ideal for temporary or permanent use
* Cost-effective alternative to fixed cold rooms

For businesses that need flexible cold chain solutions, a refrigerated container is a practical and reliable choice.

## Common Applications for Refrigerated Containers

Refrigerated containers are used across many industries where temperature control is essential.

### Food and Beverage Storage

Restaurants, caterers, food distributors and retailers use refrigerated containers to store fresh and frozen goods during peak periods or when permanent cold storage is unavailable.

### Pharmaceutical and Medical Storage

Pharmaceutical companies and medical facilities use reefer containers to store temperature-sensitive medicines, vaccines and medical supplies in compliance with cold chain requirements.

### Agriculture and Floriculture

Farmers and flower exporters use refrigerated containers to preserve fresh produce, fruit, vegetables and cut flowers during storage and transport.

### Logistics and Distribution

Logistics companies use refrigerated containers as mobile cold storage at distribution centres, ports and warehouses to maintain the cold chain throughout the supply chain.

### Event and Temporary Cold Storage

For festivals, outdoor events and seasonal businesses, refrigerated containers provide temporary on-site cold storage that can be removed after the event.`,
    markdown_collapse: `## Refrigerated Container Sizes

Refrigerated containers are available in different sizes to suit various storage and transport requirements.

### 20ft Refrigerated Containers

A **20ft refrigerated container** is the most popular size for reefer storage. It provides an excellent balance between capacity and manageability, making it suitable for most businesses and applications.

### 40ft Refrigerated Containers

A **40ft refrigerated container** offers maximum cold storage capacity and is ideal for larger operations, distribution centres and businesses storing high volumes of perishable goods.

### High Cube Refrigerated Containers

Some refrigerated containers are also available in High Cube variants, providing additional internal height for storing taller items or increasing overall storage volume.

## Temperature Range and Performance

Refrigerated containers are equipped with powerful cooling units capable of maintaining a wide temperature range.

Typical performance specifications include:

* Temperature range: -25°C to +25°C
* Consistent temperature control
* Digital temperature monitoring
* Integrated refrigeration unit
* Three-phase power connection
* Weather-resistant exterior

This allows businesses to store both frozen and chilled products in the same type of container, depending on the temperature setting.

## New or Used Refrigerated Containers?

Customers can choose between **new** and **used** refrigerated containers depending on their budget and requirements.

### New Refrigerated Containers

A new reefer container offers the latest cooling technology, excellent condition and maximum service life. It is ideal for businesses requiring reliable, long-term cold storage with minimal maintenance.

### Used Refrigerated Containers

A used refrigerated container provides a more affordable option while still offering dependable temperature control. Before purchasing, it is important to check the condition of the cooling unit, insulation, doors and electrical systems.

For many businesses, a quality used reefer container delivers excellent value without compromising on cold chain performance.

## Refrigerated Containers vs Fixed Cold Storage

Many businesses choose refrigerated containers over permanent cold storage facilities because of their flexibility.

Fixed cold rooms often require:

* Significant construction investment
* Permanent installation
* Long lead times
* Fixed location

Refrigerated containers offer:

* Faster deployment
* Lower upfront costs
* Portability and relocation
* Scalable cold storage capacity
* Minimal site preparation

For growing businesses or temporary cold storage needs, reefer containers are often the more practical solution.

## Delivery and Installation

Refrigerated containers can be delivered directly to your location using specialist transport equipment. Before installation, it is important to ensure there is a level surface, sufficient access for the delivery vehicle and an appropriate power supply for the cooling unit.

Once positioned and connected, a refrigerated container can typically be operational within a short timeframe.

If you need advice on power requirements, positioning or delivery logistics, our team can help you find the right solution.

## Related Container Solutions

Depending on your project, you may also be interested in:

* **Standard Shipping Containers**
* **20ft Shipping Containers**
* **40ft Shipping Containers**
* **High Cube Containers**
* **Open Side Containers**
* **Storage Containers**
* **Office Containers**
* **New Containers for Sale**
* **Buy Used Containers**

## Frequently Asked Questions

### What is a refrigerated container?

A refrigerated container, or reefer container, is a shipping container equipped with a cooling unit that maintains precise temperature control for storing and transporting perishable goods.

### What temperature can a refrigerated container maintain?

Most refrigerated containers can maintain temperatures ranging from -25°C to +25°C, making them suitable for both frozen and chilled products.

### What are refrigerated containers used for?

Refrigerated containers are used for storing and transporting food, beverages, pharmaceuticals, medical supplies, flowers, agricultural produce and other temperature-sensitive goods.

### Can I buy a new or used refrigerated container?

Yes. We offer both new and used reefer containers. A new container offers the latest technology and maximum service life, while a used container provides a more affordable cold storage solution.

### Do refrigerated containers require a power supply?

Yes. The cooling unit requires a three-phase power connection to maintain temperature. It is important to ensure the correct power supply is available at your site before installation.

### Can a refrigerated container be used outdoors?

Yes. Refrigerated containers are built to ISO shipping container standards with durable corten steel construction, making them suitable for outdoor use in various weather conditions.`,
  },
  // Size-based content
  "10ft": {
    label: "Size Guide",
    markdown: `# 10ft Shipping Containers

## Compact, Secure and Built for Small Spaces

A **10ft shipping container** is the ideal choice when you need secure storage but have limited space available. Its compact size makes it easy to position on construction sites, business premises, farms or private properties while still offering the strength and durability of a standard ISO shipping container.

Although it is the smallest standard container size, a 10ft container provides ample room for tools, machinery, furniture, garden equipment, archive boxes and business inventory. Manufactured from high-quality corten steel, it offers excellent protection against theft, rain and harsh weather conditions, making it a reliable storage solution throughout the year.

Whether you need extra storage for a temporary project or a long-term investment for your business, a 10ft shipping container offers a practical and cost-effective solution.

## Why Choose a 10ft Shipping Container?

One of the biggest advantages of a 10ft container is its versatility. It offers secure storage without occupying the space required for larger containers, making it ideal for locations where every square metre matters.

A 10ft container is an excellent choice if you need:

* Secure on-site storage
* A compact container for limited spaces
* Storage for tools, equipment or materials
* A durable weatherproof solution
* A container that is easy to transport and relocate

## Common Applications

Because of its practical size, a 10ft shipping container is used across many different industries and private projects. Common applications include:

* Construction site storage
* Garden and residential storage
* Agricultural equipment storage
* Workshop and maintenance storage
* Retail stock storage
* Sports and recreational equipment
* Archive and document storage
* Small business inventory

Its flexibility makes it one of the most popular choices for customers who require secure storage without investing in a larger container.`,
    markdown_collapse: `## 10ft Container Dimensions

A standard 10ft shipping container offers approximately **16 m³ of internal storage space**, making it surprisingly spacious for its compact footprint.

Typical specifications include:

* External Length: approximately 2.99 m
* External Width: 2.44 m
* External Height: 2.59 m
* Internal Capacity: approximately 16 m³

For detailed specifications, weight information and internal measurements, visit our **Container Dimensions** page.

## Available Types

Our 10ft containers are available in several configurations to suit different requirements.

**Standard 10ft Containers** are ideal for general storage and transport.

**High Cube Containers** provide additional internal height, making them suitable for taller equipment or larger storage volumes.

Customers can also choose between **new one-trip containers**, which offer excellent cosmetic condition and maximum service life, or **used containers**, which provide a more economical storage solution while maintaining structural integrity.

## Should You Buy New or Used?

Choosing between a new and used container depends on your budget and intended use.

A **new shipping container** is recommended when appearance, long-term durability and minimal wear are important. These containers have typically completed only one international shipment before being offered for sale.

A **used shipping container** offers outstanding value for customers looking for secure storage at a lower price. Every quality used container remains structurally sound, weather-resistant and suitable for commercial or private applications.

## Delivery Made Easy

All containers can be delivered directly to your location using specialist transport. Before delivery, it is important to ensure there is sufficient access and a level surface for safe placement.

If you are unsure which delivery method is most suitable, our team can help you choose the right transport solution for your site.

## Not Sure if 10ft is the Right Size?

A 10ft container is perfect for compact storage, but it may not be the best option for every project.

If you need additional storage capacity, compare our **20ft Shipping Containers**, which offer significantly more internal space while remaining easy to transport.

For large commercial storage or shipping applications, our **40ft Shipping Containers** provide the highest storage capacity available.

## Related Container Solutions

Depending on your project, you may also be interested in:

* **20ft Shipping Containers**
* **40ft Shipping Containers**
* **Storage Containers**
* **Office Containers**
* **Open Side Containers**
* **New Containers for Sale**
* **Buy Used Containers**

## Frequently Asked Questions

### Is a 10ft shipping container suitable for business use?

Yes. Many businesses use 10ft containers for secure on-site storage of tools, equipment, spare parts and inventory.

### Can a 10ft container be transported easily?

Yes. Thanks to its compact dimensions, a 10ft container is generally easier to transport and position than larger containers.

### Should I buy a new or used 10ft container?

A new container offers the best appearance and longest service life, while a used container provides a more budget-friendly solution without compromising security or durability.

### Can I use a 10ft container outdoors?

Absolutely. Shipping containers are designed to withstand harsh weather conditions, making them suitable for long-term outdoor use.`,
  },
  "20ft": {
    label: "Size Guide",
    markdown: `# 20ft Shipping Containers

## The World's Most Popular Shipping Container

A **20ft shipping container** is the most widely used container size in the world and for good reason. It offers the perfect balance between storage capacity, transportability and affordability, making it suitable for both commercial and private use. Whether you need extra storage space, a secure solution for transporting goods or a container for a conversion project, a 20ft container is one of the most versatile options available.

Manufactured from high-strength corten steel and built to international ISO standards, 20ft containers are designed to withstand harsh weather conditions while protecting valuable equipment and cargo. They are commonly used on construction sites, industrial facilities, farms, warehouses and residential properties where secure, weatherproof storage is essential.

Whether you're looking for a **new one-trip container** or a **quality used container**, a 20ft shipping container is a long-term investment that offers flexibility, durability and excellent value.

## Why Choose a 20ft Shipping Container?

The 20ft container has become the industry standard because it is large enough for most storage and transport applications while remaining easy to deliver and position. It provides significantly more storage space than a 10ft container without requiring the footprint of a larger 40ft unit.

A 20ft shipping container is an excellent choice if you need:

* Secure on-site storage
* Transport for commercial goods
* A weatherproof storage solution
* Space for tools, machinery or inventory
* A container for conversion projects
* A durable long-term storage investment

Its versatility makes it suitable for businesses of every size, as well as homeowners looking for extra storage space.

## Common Applications

A 20ft shipping container can be used across a wide range of industries thanks to its practical dimensions and robust construction.

Popular applications include:

* Construction site storage
* Warehouse overflow storage
* Agricultural equipment storage
* Retail inventory storage
* Manufacturing facilities
* Furniture and household storage
* Workshop or maintenance storage
* International cargo transport
* Container conversion projects

Because of its flexibility, the 20ft container remains one of the most popular choices for businesses and private customers alike.`,
    markdown_collapse: `## 20ft Container Dimensions

A standard 20ft shipping container offers generous storage capacity while remaining compact enough for most locations. It provides ample room for palletised goods, machinery, tools, furniture and commercial inventory.

Typical specifications include:

* External Length: approximately 6.06 m
* External Width: 2.44 m
* External Height: 2.59 m
* Internal Capacity: approximately 33 m³

If you require precise internal dimensions, weight specifications or loading capacity, visit our **Container Dimensions** page.

## Available Types of 20ft Containers

One of the biggest advantages of choosing a 20ft container is the wide range of configurations available. Depending on your project, you can select a model that best matches your storage or transport requirements.

**Standard Shipping Containers** are ideal for general storage and freight.

**Open Side Containers** feature full-length side doors, making it easier to load oversized goods or palletised cargo.

**Refrigerated Containers** provide reliable temperature-controlled storage for food, pharmaceuticals and other sensitive products.

**Office Containers** can be fitted with insulation, electricity, lighting and air conditioning to create comfortable mobile workspaces.

You can also choose between **new one-trip containers** and **used containers**, depending on your budget and intended use.

## Should You Buy a New or Used 20ft Container?

Choosing between a new and used container depends on how you intend to use it.

A **new shipping container** is an excellent option for customers looking for maximum durability, minimal wear and a professional appearance. These containers have typically completed only one international shipment before being offered for sale.

A **used shipping container** provides a more economical solution while still offering excellent structural strength and weather protection. Quality used containers remain a popular choice for construction sites, farms, workshops and business storage.

If budget is an important consideration, a used 20ft container often delivers outstanding value.

## Delivery and Installation

Our 20ft shipping containers can be delivered directly to your site using specialist transport equipment. Before delivery, it is important to ensure there is sufficient access for the delivery vehicle and a level, stable surface where the container can be placed safely.

If you are unsure about site access or positioning, our team can help you choose the most suitable delivery option for your location.

## 20ft vs 10ft or 40ft Container

Not sure which container size is right for your project?

A **10ft shipping container** is ideal for locations with limited space or smaller storage requirements.

A **20ft shipping container** offers the best balance between storage capacity, cost and flexibility, making it the preferred choice for most customers.

If you require maximum storage capacity or regularly handle large quantities of goods, a **40ft shipping container** provides almost twice the internal volume of a 20ft container.

Comparing container sizes before purchasing will help ensure you choose the most practical solution for your needs.

## Related Container Solutions

Depending on your requirements, you may also be interested in:

* **10ft Shipping Containers**
* **40ft Shipping Containers**
* **Standard Shipping Containers**
* **Open Side Containers**
* **Refrigerated Containers**
* **Office Containers**
* **Storage Containers**
* **New Containers for Sale**
* **Buy Used Containers**

## Frequently Asked Questions

### What is a 20ft shipping container used for?

A 20ft shipping container is commonly used for secure storage, freight transport, construction sites, warehouses, farms, workshops and container conversion projects.

### Is a 20ft container suitable for international shipping?

Yes. Standard 20ft containers are manufactured to ISO specifications and are widely used for international sea, rail and road transport.

### Should I buy a new or used 20ft container?

If appearance and maximum service life are important, a new one-trip container is an excellent choice. If you are looking for a more affordable solution, a quality used container offers excellent value while maintaining structural integrity.

### Can a 20ft shipping container be converted?

Yes. Many customers convert 20ft containers into offices, workshops, storage units, pop-up shops or other modular spaces thanks to their strong steel construction.

### Is a 20ft container weatherproof?

Yes. Shipping containers are designed to withstand harsh weather conditions, helping to protect stored goods from rain, wind and moisture throughout the year.`,
  },
  "40ft": {
    label: "Size Guide",
    markdown: `# 40ft Shipping Containers

## Maximum Storage Capacity for Business and Commercial Use

A **40ft shipping container** is the ideal solution when you need maximum storage capacity without compromising on security or durability. Offering almost twice the internal volume of a 20ft container, it is widely used by logistics companies, manufacturers, construction firms, agricultural businesses and private customers who require large-scale storage or transport.

Built from high-quality corten steel and manufactured to international ISO standards, 40ft containers are designed to withstand demanding environments while protecting goods from weather, moisture and unauthorised access. They are suitable for both long-term storage and international shipping, making them one of the most versatile container solutions available.

Whether you are looking for a **new one-trip container** or a **quality used container**, a 40ft shipping container provides an excellent long-term investment for businesses that require secure, spacious and reliable storage.

## Why Choose a 40ft Shipping Container?

The biggest advantage of a 40ft container is its impressive storage capacity. It provides enough space for large quantities of palletised goods, machinery, construction materials or commercial inventory while maintaining the durability and portability expected from an ISO shipping container.

A 40ft shipping container is an excellent choice if you need:

* Maximum storage capacity
* Secure storage for large equipment
* Commercial or industrial warehousing
* International freight transport
* Long-term outdoor storage
* A container for large conversion projects

For businesses that regularly store or transport high volumes of goods, a 40ft container often delivers the best value per square metre of storage.

## Common Applications

Because of its generous internal space, a 40ft shipping container is suitable for a wide variety of commercial and industrial applications.

Popular uses include:

* Warehouse overflow storage
* Construction site storage
* Industrial equipment storage
* Agricultural machinery and supplies
* Import and export cargo
* Manufacturing facilities
* Retail inventory storage
* Furniture and household storage
* Container conversion projects
* Long-term business storage

Its versatility makes it one of the most widely used container sizes across multiple industries.`,
    markdown_collapse: `## 40ft Container Dimensions

A standard 40ft shipping container offers substantial internal space while remaining compatible with international transport systems. It is ideal for customers who need to maximise storage capacity without investing in permanent warehouse facilities.

Typical specifications include:

* External Length: approximately 12.19 m
* External Width: 2.44 m
* External Height: 2.59 m
* Internal Capacity: approximately 67 m³

For complete technical specifications, including internal dimensions, payload capacity and weight, please visit our **Container Dimensions** page.

## Available Types of 40ft Containers

The 40ft shipping container is available in several configurations to suit different industries and applications.

**Standard Shipping Containers** are suitable for general storage and international freight.

**High Cube Containers** provide approximately 30 cm of additional internal height, making them ideal for bulky goods, taller equipment or increased storage volume.

**Open Side Containers** feature full-length side-opening doors, allowing quick and convenient access to oversized cargo or palletised goods.

**Refrigerated Containers** provide reliable temperature-controlled storage for food, pharmaceuticals and other sensitive products.

Customers can also choose between **new one-trip containers** and **used containers**, depending on their budget and operational requirements.

## Should You Buy a New or Used 40ft Container?

Both new and used containers offer excellent performance, with the right choice depending on your intended application.

A **new shipping container** is recommended for customers seeking maximum service life, excellent appearance and minimal wear. Often referred to as one-trip containers, these units have only completed a single cargo journey before being offered for sale.

A **used shipping container** is a cost-effective alternative that continues to provide secure, weather-resistant storage. Quality used containers remain structurally sound and are widely used on construction sites, farms, industrial facilities and commercial premises.

If reducing costs is a priority, buying a used 40ft container can provide excellent value without sacrificing functionality.

## Delivery and Installation

Our 40ft shipping containers can be delivered directly to your chosen location using specialist transport equipment. Due to their larger size, it is important to ensure sufficient site access, turning space and a stable surface before delivery.

If you are unsure whether a 40ft container is suitable for your location, our team can advise on access requirements and recommend the most appropriate delivery method.

## 40ft Standard vs High Cube Container

Choosing between a standard and a High Cube container depends on what you intend to store.

A **standard 40ft container** is suitable for most storage and transport applications.

A **40ft High Cube container** provides additional internal height, making it easier to store bulky goods, stacked pallets or oversized equipment. Although the footprint remains the same, the extra height offers increased storage volume and greater loading flexibility.

For customers handling taller cargo or requiring additional capacity, a High Cube container is often the preferred choice.

## 40ft vs 20ft Container

Not every project requires the largest container available.

A **20ft shipping container** offers an excellent balance between storage capacity and ease of placement, making it suitable for most businesses and private customers.

A **40ft shipping container** is the better option when storing large volumes of goods, commercial inventory or industrial equipment. It provides almost twice the internal capacity of a 20ft container while delivering outstanding value for larger storage requirements.

Comparing both sizes before purchasing helps ensure you invest in the container that best matches your operational needs.

## Related Container Solutions

You may also be interested in:

* **20ft Shipping Containers**
* **10ft Shipping Containers**
* **Standard Shipping Containers**
* **Open Side Containers**
* **Refrigerated Containers**
* **Office Containers**
* **Storage Containers**
* **New Containers for Sale**
* **Buy Used Containers**

## Frequently Asked Questions

### What is a 40ft shipping container used for?

A 40ft shipping container is commonly used for large-scale storage, commercial warehousing, freight transport, industrial equipment, agricultural supplies and container conversion projects.

### What is the difference between a 40ft Standard and High Cube container?

A High Cube container offers additional internal height compared to a standard 40ft container, making it better suited for bulky or taller cargo.

### Should I buy a new or used 40ft container?

A new one-trip container offers the longest service life and the best appearance, while a quality used container provides a more affordable solution without compromising on strength or weather resistance.

### Can a 40ft container be converted?

Yes. Many businesses convert 40ft containers into offices, workshops, storage facilities, retail units or modular buildings due to their spacious interior and durable construction.

### Is a 40ft shipping container weatherproof?

Yes. All quality shipping containers are designed to withstand harsh weather conditions, providing secure protection against rain, wind and moisture for long-term outdoor storage.`,
  },
};

const NL_SEO_CONTENT = {
  general: {
    label: "Buying Guide",
    markdown: `## Zeecontainers kopen in Nederland

STF Container B.V. levert nieuwe en gebruikte zeecontainers in heel Nederland. U kunt bij ons terecht voor opslagcontainers, standaard zeecontainers, High Cube containers, Open Side containers, kantoorcontainers en koelcontainers.

Onze containers worden geselecteerd op kwaliteit, veiligheid en praktische inzetbaarheid. Of u nu extra opslagruimte nodig heeft, een container voor transport zoekt of een tijdelijke werkplek wilt plaatsen, wij helpen u de juiste maat en uitvoering te kiezen.`,
    markdown_collapse: `## Welke container past bij uw project?

Een 10ft container is geschikt voor compacte opslag en locaties met beperkte ruimte. Een 20ft container is de meest gekozen allround maat voor opslag, transport en bouwplaatsen. Een 40ft container biedt maximale capaciteit voor bedrijven die veel materiaal, voorraad of machines willen opslaan.

Twijfelt u tussen nieuw, gebruikt, One Trip of WWT? Een nieuwe of One Trip container heeft de netste uitstraling en langste resterende levensduur. Een gebruikte WWT-container is juist een voordelige keuze voor droge buitenopslag.`,
  },
  Standard: {
    label: "Category Guide",
    markdown: `## Standaard zeecontainers

Standaard zeecontainers zijn sterke, afsluitbare containers voor opslag en transport. Ze zijn gebouwd uit cortenstaal en ontworpen voor intensief gebruik in weer en wind.

Deze uitvoering is geschikt voor bouwplaatsen, magazijnuitbreiding, bedrijfsvoorraad, gereedschap, machines en tijdelijke opslag.`,
    markdown_collapse: `## Standaard container kiezen

Kies 20ft wanneer u een praktische balans zoekt tussen ruimte en plaatsbaarheid. Kies 40ft wanneer maximale opslagcapaciteit belangrijker is dan een compacte footprint.`,
  },
  "High Cube": {
    label: "Category Guide",
    markdown: `## High Cube containers

High Cube containers bieden extra binnenhoogte ten opzichte van standaardcontainers. Daardoor zijn ze geschikt voor hogere goederen, projectinrichting, werkplaatsen en containerombouw.

Voor bedrijven die meer volume nodig hebben zonder een grotere footprint, is een High Cube vaak de meest praktische keuze.`,
  },
  "Open Side": {
    label: "Category Guide",
    markdown: `## Open Side containers

Open Side containers hebben naast de einddeuren ook deuren over de lengte van de zijkant. Dat maakt laden en lossen sneller wanneer u pallets, machines of brede materialen verwerkt.

Deze containers zijn populair bij bouw, evenementen, retail en bedrijven die regelmatig directe toegang tot opgeslagen goederen nodig hebben.`,
  },
  Office: {
    label: "Category Guide",
    markdown: `## Kantoorcontainers

Kantoorcontainers bieden snel inzetbare werkruimte op locatie. Ze zijn geschikt als bouwplaatskantoor, projectruimte, tijdelijke receptie of extra kantoorcapaciteit.

Afhankelijk van uitvoering kunnen kantoorcontainers worden geleverd met ramen, deur, isolatie en elektravoorbereiding.`,
  },
  Storage: {
    label: "Category Guide",
    markdown: `## Opslagcontainers

Opslagcontainers zijn bedoeld voor veilige, droge en flexibele opslag op eigen terrein. Ze zijn afsluitbaar, robuust en geschikt voor langdurig buitengebruik.

Ze worden veel gebruikt voor bouwmateriaal, voorraad, gereedschap, landbouwmateriaal en tijdelijke magazijnruimte.`,
  },
  Refrigerated: {
    label: "Category Guide",
    markdown: `## Koelcontainers

Koelcontainers zijn geschikt voor temperatuurgevoelige opslag, zoals voedingsmiddelen, farmaceutische producten, evenementenvoorraad en tijdelijke koelcapaciteit.

Een koelcontainer combineert stevige containerbouw met geïsoleerde wanden en temperatuurregeling.`,
  },
  "10ft": {
    label: "Size Guide",
    markdown: `## 10ft containers

Een 10ft container is compact en daardoor geschikt voor locaties met beperkte ruimte. Deze maat wordt vaak gekozen voor gereedschap, kleine voorraad, tuinopslag en tijdelijke opslag bij projecten.`,
  },
  "20ft": {
    label: "Size Guide",
    markdown: `## 20ft containers

De 20ft container is de meest veelzijdige maat. Hij biedt veel opslagruimte, blijft goed plaatsbaar en is geschikt voor zowel bedrijven als particulieren.`,
    markdown_collapse: `## Gebruik van 20ft containers

Veelgebruikte toepassingen zijn bouwplaatsopslag, transport, bedrijfsvoorraad, machines, seizoensopslag en containerombouw.`,
  },
  "40ft": {
    label: "Size Guide",
    markdown: `## 40ft containers

Een 40ft container biedt maximale opslagcapaciteit. Deze maat is geschikt voor grote hoeveelheden goederen, machines, materialen of magazijnuitbreiding.`,
    markdown_collapse: `## Wanneer kiest u 40ft?

Kies 40ft wanneer u veel volume nodig heeft en voldoende plaatsingsruimte beschikbaar is. Voor hogere goederen kan een 40ft High Cube een betere keuze zijn.`,
  },
};

const SEO_CONTENT_BY_LANGUAGE = {
  en: SEO_CONTENT,
  nl: NL_SEO_CONTENT,
  ...localizedSEOContent,
};

const SEO_UI_LABELS = {
  nl: {
    "Buying Guide": "Koopgids",
    "Category Guide": "Categoriegids",
    "Size Guide": "Maatgids",
    showLess: "Minder tonen",
    continueReading: "Verder lezen",
  },
  de: {
    "Buying Guide": "Kaufberatung",
    "Category Guide": "Kategorieratgeber",
    "Size Guide": "Größenratgeber",
    showLess: "Weniger anzeigen",
    continueReading: "Weiterlesen",
  },
  fr: {
    "Buying Guide": "Guide d'achat",
    "Category Guide": "Guide de catégorie",
    "Size Guide": "Guide des dimensions",
    showLess: "Afficher moins",
    continueReading: "Lire la suite",
  },
  es: {
    "Buying Guide": "Guía de compra",
    "Category Guide": "Guía de categoría",
    "Size Guide": "Guía de tamaños",
    showLess: "Mostrar menos",
    continueReading: "Seguir leyendo",
  },
};

function seoLabel(language, label) {
  return SEO_UI_LABELS[language]?.[label] || label;
}

function seoAction(language, action) {
  return SEO_UI_LABELS[language]?.[action] || (action === "showLess" ? "Show Less" : "Continue Reading");
}

const markdownComponents = {
  h1: ({ node: _node, ...props }) => <h2 className="text-2xl lg:text-3xl font-bold text-navy-800 mb-6 mt-0" {...props} />,
  h2: ({ node: _node, ...props }) => <h3 className="text-xl font-bold text-navy-800 mt-10 mb-4" {...props} />,
  h3: ({ node: _node, ...props }) => <h4 className="text-base font-semibold text-navy-700 mt-6 mb-2" {...props} />,
  p: ({ node: _node, ...props }) => <p className="text-gray-600 leading-relaxed text-[15px] mb-4" {...props} />,
  ul: ({ node: _node, ...props }) => <ul className="list-disc list-inside space-y-1.5 text-gray-600 text-[15px] mb-4 ml-2" {...props} />,
  li: ({ node: _node, ...props }) => <li className="leading-relaxed" {...props} />,
  strong: ({ node: _node, ...props }) => <strong className="font-semibold text-navy-800" {...props} />,
  a: ({ node: _node, ...props }) => <a className="text-navy-600 hover:text-orange-500 underline transition-colors" {...props} />,
};

export default function SEOSection({ type, size }) {
  const [expanded, setExpanded] = useState(false);
  const { language } = useLanguage();
  let content;

  const contentSource = SEO_CONTENT_BY_LANGUAGE[language] || NL_SEO_CONTENT;

  if (type && contentSource[type]) {
    content = contentSource[type];
  } else if (size && contentSource[size]) {
    content = contentSource[size];
  } else {
    content = contentSource.general;
  }

  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-orange-500" />
          <span className="font-technical text-xs text-orange-500 uppercase tracking-widest">
            {seoLabel(language, content.label)}
          </span>
        </div>
        <ReactMarkdown components={markdownComponents}>
          {content.markdown}
        </ReactMarkdown>

        {content.markdown_collapse && (
          <>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <ReactMarkdown components={markdownComponents}>
                    {content.markdown_collapse}
                  </ReactMarkdown>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 mt-2 text-navy-700 font-medium hover:text-orange-500 transition-colors"
            >
              {expanded ? seoAction(language, "showLess") : seoAction(language, "continueReading")}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
