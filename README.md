Streamlining Dataraptor Management for Seamless Development



Omnistudio, a robust low-code development platform, empowers developers to create dynamic applications swiftly. However, as projects evolve, developers often grapple with the challenge of efficiently managing and tracing Dataraptors across multiple Omniscripts and Integration Procedures, especially when employing a single Dataraptor in various instances.In response to this common pain point, a breakthrough solution has developed - reusable Lightning components designed specifically to streamline the process of identifying the usage of a Dataraptor within Omnistudio.



Use case:

Using a single Dataraptor across various components is a best practice but can quickly become a source of confusion. Developers often find it challenging to pinpoint the parent element where a specific Dataraptor is employed, leading to increased development time and potential errors.



Solution


To tackle this issue head-on, a set of reusable Lightning components has been crafted. These components are ingeniously designed to provide developers with a bird's-eye view of the usage of a Dataraptor across the entire Omnistudio project.

Git Repo Link : https://github.com/shantanumane/ServicesCentralAssets
Component List :

1. LWC Components :
    1. DataraptorFinder
    2. DataRaptorFinderSearchResult
2. Apex Class :
    1. DataRaptorSearchController
3. Flexi Page :
    1. Search_Dataraptor_Parent
4. Custom Label:
    1. ElementTypeToBeSearched




Component Overview: 


1. Omnistudio Flexipage Integration: This solution revolves around a Flexipage named "Search_Dataraptor_Parent," seamlessly integrating Lightning Web Components (LWC) designed for efficient Dataraptor exploration. 
2. Omnistudio Application Tab: A new tab within the Omnistudio application acts as a gateway to our Flexipage, providing a dedicated space for users to initiate the Dataraptor discovery process effortlessly. 
3. DataraptorFinder Component: The cornerstone of this solution, the DataraptorFinder LWC component, empowers users to input the name of the Dataraptor they wish to investigate. This component serves as the control center for initiating searches and orchestrating the subsequent discovery process.
4. DataRaptorFinderSearchResult Component: Acting as the child component to DataraptorFinder, the DataRaptorFinderSearchResult LWC component dynamically presents the results of the Dataraptor search. This visual representation enhances user experience by providing a clear and organized view of the discovered parent elements.
5. Custom Label for Search Criteria: The ElementTypeToBeSearched custom label defines the element types users want to include in the search result. This dynamic label allows for flexible customization, catering to specific project needs, and ensuring a targeted search approach.
6. Apex logic DataRaptorSearchController: This class contains the backend logic to perform search. It includes two main methods searchDataraptorParents and searchDataraptor. 
    1. searchDataraptorParents : Method to search for parent DataRaptor elements based on a specific name.
    2. searchDataraptor : Method to search for DataRaptor elements based on a partial name match.



Final Result : 

<img width="1493" alt="image" src="https://github.com/shantanumane/ServicesCentralAssets/assets/51712321/3a2a138f-4c6f-44f3-a9eb-d7ae9a2e05c9">
