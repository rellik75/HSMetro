define(["jquery", "knockout", "pageLayout", "metrojs", "text!./study.html"], function ($, ko, pageLayout, metro, studyTemplate) {

    function StudyViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: StudyViewModel,
        template: studyTemplate
    };

});