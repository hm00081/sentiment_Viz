const API_KEY = '3375ae8bae85068c7b65d136a499ea10d094621e730d5996a80648ba7ab3f3cf';
const BASE_PATH = 'http://localhost:3002/profile';
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch('3375ae8bae85068c7b65d136a499ea10d094621e730d5996a80648ba7ab3f3cf');

// interface IPaper {
//     title: string;
//     snippet: string;
//     name: string; //author
//     overview: string;
//     link: string; //pdf
//     data: {
//         target: {
//             Entity: string;
//             Aspect: string;
//         };
//         image: {
//             data: string;
//         };
//     };
// }

export interface Info {
    result_id: string;
    publication_info: { summary: string };
    summary: string;
    title: string;
    link: string;
    snippet: string;
    backdrop_path: string;
    pdf_link: string;
    year: string;
    target: string;
    entity: string;
    aspect: string;
    sentiment: string;
    opinion_holder: string;
    time: string;
    intermediation: string;
    detection: string;
    subjectivity_detection: string;
    emotion_cause_detection: string;
    identifying_the_intent_of_sentiment_information: string;
    detection_of_evidence_event_that_causes_sentiment_patterns: string;
    argument_expression_detection: string;
    aspect_based_sentiment_analysis: string;
    detection_of_fake_or_deceptive_sentiment_information: string;
    hate_speech: string;
    summarization: string;
    opinion_summarization: string;
    sentiment_information_description_a_multi_aspect: string;
    classification: string;
    emotion_detection_and_classification: string;
    polarity_classification: string;
    comparison: string;
    comparion_of_different_sentiments: string;
    exploration: string;
    timeline_analysis: string;
    analysis_of_debates_comments_and_argumentation: string;
    finding_significant: string;
    easy_exploration_of_sentiment_information: string;
    representation: string;
    element: string;
    natural: string;
    celestial: string;
    human: string;
    animal: string;
    plant: string;
    compound: string;
    metal: string;
    nonmetal: string;
    artifact: string;
    building: string;
    structure: string;
    geometry: string;
    solid: string;
    picture: string;
    pattern: string;
    map: string;
    fiber: string;
    machine: string;
    letter: string;
    process: string;
    natural_phenomena: string;
    machine_phenomena: string;
    behavior: string;
    disaster: string;
    space_time_movement: string;
    creation_and_destruction: string;
    vis_var: string;
    value: string;
    color: string;
    dimension: string;
    shape: string;
    position: string;
    orientation: string;
    distance: string;
    vis_tech: string;
    d_visualization: string;
    node_link_diagram: string;
    bubble_chart: string;
    area_chart: string;
    line_plot: string;
    box_plot: string;
    pie_chart: string;
    radar_chart: string;
    tree_map: string;
    text_cloud: string;
    heatmap: string;
    scatter_plot: string;
    mds_map: string;
    parallel_coordinate: string;
    pixel_based_plot: string;
    time_oriented_visualization: string;
    spatial_based_visualization: string;
}

export interface IGetPapersResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    results: Info[];
    backdrop_path: string;
}

//Taxonomy Data.

export function getAPIs() {
    return fetch(`${BASE_PATH}`).then((response) => response.json());
}

export function getAPIss({ tvOrMovie, query, position }: { tvOrMovie: string; query: string; position?: number }) {
    return fetch(`${BASE_PATH}`).then((response) => response.json());
}

export function getImage() {
    return fetch(`https://i.imgur.com`).then((response) => response.json());
}
