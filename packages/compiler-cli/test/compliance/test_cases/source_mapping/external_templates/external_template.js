i0.ɵɵelementStart(0, "div") // SOURCE: "/dir/test.html" "<div>"
…
i0.ɵɵtext(1, "this is a test") // SOURCE: "/dir/test.html" "this is a test"
…
i0.ɵɵelementEnd() // SOURCE: "/dir/test.html" "</div>"
…
i0.ɵɵelementStart(2, "div") // SOURCE: "/dir/test.html" "<div>"
…
i0.ɵɵtext(3) // SOURCE: "/dir/test.html" "{{ 1 + 2 }}"
…
i0.ɵɵelementEnd() // SOURCE: "/dir/test.html" "</div>"
…
i0.ɵɵtextInterpolate(1 + 2) // SOURCE: "/dir/test.html" "{{ 1 + 2 }}"