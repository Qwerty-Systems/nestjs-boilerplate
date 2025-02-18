## 1. Core System Entities

### Tenant (Waste Management Company, Recycling Company, Community Group)
```bash
npm run generate:resource:all-db -- --name tenant
npm run migration:generate -- src/database/migrations/CreateTenantTable
npm run add:property:to-all-db
```

```markdown
| Column     | Type   | Description                                      |
|------------|--------|--------------------------------------------------|
| id         | UUID   | Primary key                                     |
| name       | String | Tenant name                                     |
| type       | Enum   | WASTE_MANAGEMENT, RECYCLING_COMPANY, COMMUNITY_GROUP |
| domain     | String | Custom domain for the tenant                    |
| settingsId | UUID   | Linked to Settings table                        |
| createdAt  | Date   | Timestamp                                       |
| updatedAt  | Date   | Timestamp                                       |
```

### Settings (Configurable per Tenant)
```bash
npm run generate:resource:all-db -- --name setting
npm run migration:generate -- src/database/migrations/CreateSettingsTable
```

```markdown
| Column                    | Type    | Description                           |
|---------------------------|---------|---------------------------------------|
| id                        | UUID    | Primary key                          |
| tenantId                  | UUID    | Foreign key (Tenant)                 |
| billingCycle              | Enum    | MONTHLY, WEEKLY, ANNUALLY            |
| smsNotificationsEnabled   | Boolean | Enables SMS notifications            |
| emailNotificationsEnabled | Boolean | Enables Email notifications          |
| createdAt                 | Date    | Timestamp                            |
| updatedAt                 | Date    | Timestamp                            |
```

## 2. Region & Assignments

### Region & AgentRegion (Many-to-Many for Assignments)
```bash
npm run generate:resource:all-db -- --name region
npm run generate:resource:all-db -- --name agent-region
npm run migration:generate -- src/database/migrations/CreateRegionTables
```

#### Region Table
```markdown
| Column     | Type   | Description          |
|------------|--------|----------------------|
| id         | UUID   | Primary key          |
| tenantId   | UUID   | Foreign key (Tenant) |
| name       | String | Region name         |
| description| String | Region details      |
| createdAt  | Date   | Timestamp           |
| updatedAt  | Date   | Timestamp           |
```

#### AgentRegion Table
```markdown
| Column     | Type   | Description          |
|------------|--------|----------------------|
| id         | UUID   | Primary key          |
| agentId    | UUID   | Foreign key (User)   |
| regionId   | UUID   | Foreign key (Region) |
```

## 3. Residence & Residence Users

```bash
npm run generate:resource:all-db -- --name residence
npm run generate:resource:all-db -- --name residence-users
npm run migration:generate -- src/database/migrations/CreateResidenceTables
```

#### Residence Table
```markdown
| Column           | Type   | Description                           |
|-----------------|--------|---------------------------------------|
| id              | UUID   | Primary key                          |
| tenantId        | UUID   | Foreign key (Tenant)                 |
| regionId        | UUID   | Foreign key (Region)                 |
| name            | String | Residence name (if applicable)       |
| residenceNumber | String | Unique identifier                     |
| type           | Enum   | APARTMENT, BUILDING, PERSONAL_RESIDENCE |
| createdAt       | Date   | Timestamp                            |
| updatedAt       | Date   | Timestamp                            |
```

## 4. Accounting & Financial Entities

### Chart of Accounts (Double-Entry Accounting)
```bash
npm run generate:resource:all-db -- --name chartOfAccount
npm run migration:generate -- src/database/migrations/CreateChartOfAccountsTable
```

```markdown
| Column           | Type   | Description                                      |
|-----------------|--------|--------------------------------------------------|
| id              | UUID   | Primary key                                     |
| tenantId        | UUID   | Foreign key (Tenant)                            |
| accountName     | String | Name of the account                            |
| accountType     | Enum   | ASSET, LIABILITY, EQUITY, REVENUE, EXPENSE     |
| parentAccountId | UUID   | Self-referential for sub-accounts              |
| createdAt       | Date   | Timestamp                                      |
| updatedAt       | Date   | Timestamp                                      |
```


AgentRegion Table
## 2. Waste Collection & Recycling Entities

### Waste Collection (Pickup Requests & Scheduled Pickups)
```bash
npm run generate:resource:all-db -- --name waste-collections
npm run migration:generate -- src/database/migrations/CreateWasteCollectionTable
```

```markdown
| Column        | Type   | Description                          |
|--------------|--------|--------------------------------------|
| id           | UUID   | Primary key                          |
| tenantId     | UUID   | Foreign key (Tenant)                |
| customerId   | UUID   | Foreign key (User)                  |
| regionId     | UUID   | Foreign key (Region)                |
| residenceId  | UUID   | Foreign key (Residence)             |
| collectionDate | Date   | Scheduled date for pickup          |
| wasteType    | Enum   | ORGANIC, PLASTIC, PAPER, METAL, E-WASTE, MIXED |
| weight       | Float  | Approximate weight (kg)             |
| status       | Enum   | REQUESTED, SCHEDULED, COMPLETED, CANCELED |
| assignedAgentId | UUID   | Foreign key (User - Collection Agent) |
| createdAt    | Date   | Timestamp                           |
| updatedAt    | Date   | Timestamp                           |
```

### Waste Types (Categorization for Sorting & Billing)
```bash
npm run generate:resource:all-db -- --name waste-types
npm run migration:generate -- src/database/migrations/CreateWasteTypesTable
```

```markdown
| Column      | Type    | Description                          |
|------------|---------|--------------------------------------|
| id         | UUID    | Primary key                          |
| name       | String  | Waste category (Plastic, Metal, Organic, etc.) |
| description | String  | Detailed description                |
| recyclable | Boolean | Indicates if this type can be recycled |
| createdAt  | Date    | Timestamp                            |
| updatedAt  | Date    | Timestamp                            |
```

### Recycling Marketplace (Buyers, Sellers, and Recycling Centers)
```bash
npm run generate:resource:all-db -- --name recycling-marketplace
npm run migration:generate -- src/database/migrations/CreateRecyclingMarketplaceTable
```

```markdown
| Column      | Type   | Description                         |
|------------|--------|-------------------------------------|
| id         | UUID   | Primary key                         |
| tenantId   | UUID   | Foreign key (Tenant)               |
| wasteTypeId | UUID   | Foreign key (WasteType)            |
| sellerId   | UUID   | Foreign key (User - Waste Provider) |
| buyerId    | UUID   | Foreign key (User - Recycling Center) |
| pricePerKg | Float  | Price per kilogram                  |
| quantity   | Float  | Available quantity (kg)             |
| status     | Enum   | LISTED, PENDING, SOLD               |
| createdAt  | Date   | Timestamp                           |
| updatedAt  | Date   | Timestamp                           |
```

## 3. Billing & Subscription Management

### Billing Plans (Monthly, Pay-Per-Collection, etc.)
```bash
npm run generate:resource:all-db -- --name billing-plans
npm run migration:generate -- src/database/migrations/CreateBillingPlansTable
```

```markdown
| Column      | Type   | Description                         |
|------------|--------|-------------------------------------|
| id         | UUID   | Primary key                         |
| tenantId   | UUID   | Foreign key (Tenant)               |
| planName   | String | Name of the plan                    |
| billingCycle | Enum   | MONTHLY, PAY_PER_COLLECTION       |
| price      | Float  | Price of the plan                   |
| description | String | Details about the plan             |
| createdAt  | Date   | Timestamp                           |
| updatedAt  | Date   | Timestamp
```
