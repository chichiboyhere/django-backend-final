# Generated by Django 4.0.4 on 2022-08-26 15:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('mental', '0003_remove_mentalgameresult_name_mentalgameresult_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuantitativeSpsec',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantitativeSps', models.DecimalField(decimal_places=2, max_digits=5)),
                ('time', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]