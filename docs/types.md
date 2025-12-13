# Utility Types

Type aliases, enums, and helper types.

## ID Types

Type aliases for entity identifiers.

```typescript
type CourtId = string;
type PersonId = number;
type OpinionId = number;
type ClusterId = number;
type CitationId = number;
type DocketId = number;
```

## PaginatedResponse

Generic wrapper for paginated API responses.

```typescript
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
```

### Usage

```typescript
import type { PaginatedResponse, Court } from '@types/lawforge__courtlistener';

const res = await fetch('https://www.courtlistener.com/api/rest/v4/courts/');
const data: PaginatedResponse<Court> = await res.json();

console.log(`Total: ${data.count}`);
console.log(`Results: ${data.results.length}`);
console.log(`Next page: ${data.next}`);
```

## Jurisdiction

Court jurisdiction codes.

```typescript
type Jurisdiction = "F" | "S" | "T" | "M" | "P" | "L";
```

| Code | Description |
|------|-------------|
| `F` | Federal |
| `S` | State |
| `T` | Tribal |
| `M` | Military |
| `P` | Provincial |
| `L` | Local |

## OpinionType

Opinion type codes.

```typescript
type OpinionType =
  | "010combined"
  | "015unamimous"
  | "020lead"
  | "025plurality"
  | "030concurrence"
  | "035concurrenceinpart"
  | "040dissent"
  | "050addendum"
  | "060errata"
  | "070supplement"
  | "080rehearing"
  | "090rehearingrehearing"
  | "100specialmaster"
  | "110statement"
  | "120recusation"
  | "130register"
  | "140percuriam"
  | "150inaformal"
  | "160unknown"
  | "800memo"
  | "810designation"
  | "820judgment"
  | "830order"
  | "840opinion"
  | "850decree";
```

### Common Types

| Code | Description |
|------|-------------|
| `020lead` | Lead/Majority opinion |
| `030concurrence` | Concurring opinion |
| `040dissent` | Dissenting opinion |
| `140percuriam` | Per curiam opinion |
| `830order` | Court order |
| `840opinion` | General opinion |

## CaseStatus

Case status values.

```typescript
type CaseStatus =
  | "Argued"
  | "Decided"
  | "Granted"
  | "Opinion"
  | "Petition"
  | "Rehearing"
  | "Remanded"
  | "Terminated"
  | "Unknown";
```

## PrecedentialStatus

Opinion precedential status.

```typescript
type PrecedentialStatus =
  | "Published"
  | "Unpublished"
  | "Errata"
  | "Separate"
  | "In-chambers"
  | "Relating-to"
  | "Unknown";
```

## SourceType

Data source codes.

```typescript
type SourceType =
  | "C"  // Court website
  | "R"  // RECAP
  | "D"  // Direct court input
  | "M"  // Manual
  | "A"  // Administrative Action
  | "L"  // Law Box
  | "S"  // Slip opinions
  | "P"  // Press Release
  | "I"  // Internet
  | "U"; // Unknown
```

## BlockedStatus

Content blocking status.

```typescript
type BlockedStatus =
  | "Blocked"
  | "Unblocked"
  | "Pending"
  | "Unknown";
```

## Response Types

Convenience aliases for common responses.

```typescript
type CourtsResponse = PaginatedResponse<ApiCourt>;
type PeopleResponse = PaginatedResponse<ApiPerson>;
type OpinionClustersResponse = PaginatedResponse<ApiOpinionCluster>;
type OpinionsResponse = PaginatedResponse<ApiOpinion>;
type CitationsResponse = PaginatedResponse<ApiCitation>;
```

## Additional Types

### Audio

Oral argument recordings.

```typescript
interface Audio {
  id: number;
  case_name?: string;
  date_created?: string;
  court_id?: string;
  download_url?: string;
}
```

### Person

Judges and other court personnel.

```typescript
interface Person {
  id: number;
  name?: string;
  slug?: string;
  positions?: any[];
}
```

### Position

Judge positions.

```typescript
interface Position {
  id: number;
  person?: number;
  court?: string;
  position_type?: string;
  start_date?: string;
  end_date?: string;
}
```

### School

Educational institutions.

```typescript
interface School {
  id: number;
  name?: string;
  city?: string;
  state?: string;
}
```

### FinancialDisclosure

Judge financial disclosures.

```typescript
interface FinancialDisclosure {
  id: number;
  judge?: number;
  year?: number;
  page_number?: number;
  redacted?: boolean;
  download_url?: string;
  thumbnail?: string;
  thumbnail_size?: number;
}
```

### Parenthetical

Citation parenthetical text.

```typescript
interface Parenthetical {
  id: number;
  text?: string;
  opinion_id?: number;
}
```
