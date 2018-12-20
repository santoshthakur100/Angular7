import { Component, OnInit } from "@angular/core";
import * as $ from 'jquery';

@Component({
    selector: 'app-pcr-header',
    templateUrl: './personalChangingRoomHeader.component.html',
    styleUrls: ['./personalChangingRoomHeader.component.scss']
})

export class PersonalChangingRoomComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        $(".muahhTabSub-menu-label3-link").click(function (e) {
            e.preventDefault();
        });
        $(document).ready(function () {
            $('#searchPanelLink').click(function () {
                $('#searchPanel').slideToggle();
            })
            $('.muahhTabSub-menu-label3-link a').click(function () {
                var height = $('#myCarousel').height();
                $('html, body').animate({
                    scrollTop: $("#section2").offset().top - 126
                }, 1000);
            });
        })
    }
}