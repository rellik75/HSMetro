define(["jquery", "knockout", "pageLayout", "text!./study.html"], function ($, ko, pageLayout, studyTemplate) {

    function StudyViewModel(route) {
        pageLayout.layoutPage();
    }

    return {
        viewModel: StudyViewModel,
        template: studyTemplate
    };

});