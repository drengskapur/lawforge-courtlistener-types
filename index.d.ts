// Type definitions for CourtListener API
// Project: https://www.courtlistener.com/api/
// Definitions by: LawForge <https://github.com/drengskapur/lawforge>
// Definitions: https://github.com/drengskapur/lawforge

/// <reference types="node" />

// =============================================================================
// Core CourtListener API Types
// =============================================================================

export interface Court {
    id: string;
    name?: string;
    full_name?: string;
    abbreviation?: string;
}

export interface SearchResult {
    id?: number;
    case_name?: string;
    caseName?: string;
    court?: string;
    court_id?: string;
    date_filed?: string;
    dateFiled?: string;
    citation?: string[];
    citation_count?: number;
    cluster_id?: number;
    court_citation_string?: string;
    caseNameShort?: string;
    docketNumber?: string;
    suitNature?: string;
    cause?: string;
    nature_of_suit?: string;
    status?: string;
    jurisdiction?: string;
    region?: string;
    division?: string;
    subtype?: string;
    terminating_date_filed?: string;
    date_terminated?: string;
    date_last_filing?: string;
    assigned_to_str?: string;
    referred_to_str?: string;
    slug?: string;
    absolute_url?: string;
}

export interface OpinionCluster {
    id: number;
    case_name?: string;
    case_name_short?: string;
    date_filed?: string;
    date_filed_is_approximate?: boolean;
    slug?: string;
    case_name_full?: string;
    scdb_id?: string;
    scdb_decision_direction?: number;
    scdb_votes_majority?: number;
    scdb_votes_minority?: number;
    source?: string;
    procedural_history?: string;
    attorneys?: string;
    nature_of_suit?: string;
    posture?: string;
    syllabus?: string;
    citation_count?: number;
    precedential_status?: string;
    date_blocked?: string;
    blocked?: boolean;
    court_id?: string;
    court?: string;
    docket_id?: number;
    docket?: string | number;
}

export interface Opinion {
    id: number;
    author_id?: number | null;
    author?: string;
    author_str?: string;
    per_curiam?: boolean;
    joined_by?: any[];
    joined_by_str?: string;
    type?: string;
    sha1?: string;
    page_count?: number;
    download_url?: string;
    local_path?: string;
    plain_text?: string;
    html?: string;
    html_lawbox?: string;
    html_columbia?: string;
    xml_harvard?: string;
    html_with_citations?: string;
    extracted_by_ocr?: boolean;
    opinions_cited?: any[];
    cluster_id?: number;
    cluster?: string;
    absolute_url?: string;
}

export interface CitationLookup {
    id: number;
    volume?: number;
    reporter?: string;
    page?: string;
    type?: number;
    cluster_id?: number;
}

export interface OpinionCited {
    id: number;
    citing_opinion_id?: number;
    cited_opinion_id?: number;
    citing_opinion?: string | number;
    cited_opinion?: string | number;
    depth?: number | string;
}

export interface Docket {
    id: number;
    case_name?: string | null;
    case_name_short?: string | null;
    docket_number?: string | null;
    court_id?: string | null;
    date_filed?: string | null;
    date_terminated?: string | null;
    nature_of_suit?: string | null;
}

export interface Audio {
    id: number;
    case_name?: string;
    date_created?: string;
    court_id?: string;
    download_url?: string;
}

export interface Person {
    id: number;
    name?: string;
    slug?: string;
    positions?: any[];
}

export interface Position {
    id: number;
    person?: number;
    court?: string;
    position_type?: string;
    start_date?: string;
    end_date?: string;
}

export interface School {
    id: number;
    name?: string;
    city?: string;
    state?: string;
}

export interface FinancialDisclosure {
    id: number;
    judge?: number;
    year?: number;
    page_number?: number;
    redacted?: boolean;
    download_url?: string;
    thumbnail?: string;
    thumbnail_size?: number;
}

export interface FJCDatabase {
    id: number;
    judge_id?: number;
    date_created?: string;
    date_modified?: string;
    year?: number;
    nid?: number;
    name?: string;
    title?: string;
    court?: string;
    source_url?: string;
}

export interface Parenthetical {
    id: number;
    text?: string;
    opinion_id?: number;
}

// =============================================================================
// API Response Types (for sync operations)
// =============================================================================

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

// API-specific types that match actual CourtListener API responses
export interface ApiCourt {
    id: string;
    name?: string;
    full_name?: string;
    abbreviation?: string;
}

export interface ApiPerson {
    id: number;
    name?: string;
    slug?: string;
    positions?: any[];
}

export interface ApiOpinionCluster {
    id: number;
    case_name?: string;
    case_name_short?: string;
    date_filed?: string;
    court?: string;
    court_id?: string;
    docket?: string;
    docket_id?: number;
    citation_count?: number;
    precedential_status?: string;
}

export interface ApiOpinion {
    id: number;
    cluster_id?: number;
    case_name?: string;
    date_filed?: string;
    date_created?: string;
    plain_text?: string;
    html?: string;
    html_lawbox?: string;
    html_columbia?: string;
    xml_harvard?: string;
    html_with_citations?: string;
    extracted_by_ocr?: boolean;
    author_id?: number;
}

export interface ApiCitation {
    id: number;
    citing_opinion_id?: number;
    cited_opinion_id?: number;
    citing_opinion?: string | number;
    cited_opinion?: string | number;
    depth?: number | string;
}

// Convenience type aliases for sync operations
export type CourtsResponse = PaginatedResponse<ApiCourt>;
export type PeopleResponse = PaginatedResponse<ApiPerson>;
export type OpinionClustersResponse = PaginatedResponse<ApiOpinionCluster>;
export type OpinionsResponse = PaginatedResponse<ApiOpinion>;
export type CitationsResponse = PaginatedResponse<ApiCitation>;

// =============================================================================
// Utility Types
// =============================================================================

export type CourtId = string;
export type PersonId = number;
export type OpinionId = number;
export type ClusterId = number;
export type CitationId = number;
export type DocketId = number;

// Jurisdiction types
export type Jurisdiction = "F" | "S" | "T" | "M" | "P" | "L";
export type CourtType = "F" | "S" | "T" | "M" | "P" | "L";

// Opinion types
export type OpinionType =
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

// Status types
export type CaseStatus =
    | "Argued"
    | "Decided"
    | "Granted"
    | "Opinion"
    | "Petition"
    | "Rehearing"
    | "Remanded"
    | "Terminated"
    | "Unknown";

// Precedential status
export type PrecedentialStatus =
    | "Published"
    | "Unpublished"
    | "Errata"
    | "Separate"
    | "In-chambers"
    | "Relating-to"
    | "Unknown";

// Source types
export type SourceType =
    | "C"  // Court website
    | "R"  // RECAP
    | "D"  // Direct court input
    | "M"  // Manual
    | "A"  // Administrative Action
    | "L"  // Law Box
    | "S"  // Slip opinions
    | "P"  // Press Release
    | "I"  // Internet
    | "U"  // Unknown;

// Blocked status
export type BlockedStatus =
    | "Blocked"
    | "Unblocked"
    | "Pending"
    | "Unknown";
