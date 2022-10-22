from django.contrib import admin
from .models import MentalGameResult, QuantitativeSpsec, VerbalSpsec, Contact

# Register your models here.


class MentalAdmin(admin.ModelAdmin):
    list_display = ('user', 'score', 'questions', 'speed', 'time')

class QuantitaiveAdmin(admin.ModelAdmin):
    list_display = ('user', 'score', 'quantitativeSps', 'time')

class VerbalAdmin(admin.ModelAdmin):
    list_display = ('user', 'score', 'verbalSps', 'time')

class ContactAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'message', 'time')


admin.site.register(MentalGameResult, MentalAdmin)
admin.site.register(QuantitativeSpsec, QuantitaiveAdmin)
admin.site.register(VerbalSpsec, VerbalAdmin)
admin.site.register(Contact, ContactAdmin)
